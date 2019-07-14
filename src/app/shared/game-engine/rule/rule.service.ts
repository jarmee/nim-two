import { Inject, Injectable, Optional } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, withLatestFrom } from "rxjs/operators";
import { differenceOf } from "../board/board.helpers";
import { BoardDifferences } from "../board/board.model";
import { GameState } from "../state/state.model";
import { StateService } from "../state/state.service";
import { Player } from "../turn/turn.model";
import { TurnService } from "../turn/turn.service";
import { applyRules, setPlayerForBoardIn } from "./rule.helpers";
import { GameRules, GAME_RULES } from "./rule.model";

@Injectable()
export class RuleService {
  applyRules$: BehaviorSubject<Partial<GameState>> = new BehaviorSubject<
    Partial<GameState>
  >(null);

  rulesApplied$: Observable<GameState> = this.applyRules$.pipe(
    filter((state: GameState) => !!state),
    withLatestFrom(this.stateService.state$, this.turnSerivce.selectedPlayer$),
    map(
      ([newGameState, onlyToTheChangedColumnsOfActualState, toPlayer]: [
        GameState,
        GameState,
        Player
      ]) => [
        setPlayerForBoardIn(
          newGameState,
          onlyToTheChangedColumnsOfActualState,
          toPlayer
        ),
        onlyToTheChangedColumnsOfActualState
      ]
    ),
    map(([newGameState, andActualGameState]: [GameState, GameState]) => [
      newGameState,
      andActualGameState,
      differenceOf(newGameState.board, andActualGameState.board)
    ]),
    map(
      ([newState, actualState, boardDifferences]: [
        GameState,
        GameState,
        BoardDifferences
      ]) =>
        applyRules(this.rules)(
          Object.freeze(newState),
          Object.freeze(actualState),
          boardDifferences
        )
    )
  );

  constructor(
    private stateService: StateService,
    private turnSerivce: TurnService,
    @Optional() @Inject(GAME_RULES) private rules: GameRules = []
  ) {}

  applyRules(state: GameState) {
    this.applyRules$.next(state);
  }
}
