import { Inject, Injectable, Optional } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, skip, tap, withLatestFrom } from "rxjs/operators";
import { differenceOf } from "../../board/board.helpers";
import { BoardDifferences } from "../../board/board.model";
import { GameState, GAME_STATE_STORE } from "../game-engine.model";
import { GameEngineStore } from "../game-engine.store";
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
    skip(1),
    withLatestFrom(this.store, this.turnSerivce.selectedPlayer$),
    tap(console.log),
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
        onlyToTheChangedColumnsOfActualState,
        toPlayer
      ]
    ),
    map(
      ([newGameState, andActualGameState, player]: [
        GameState,
        GameState,
        Player
      ]) => [
        newGameState,
        andActualGameState,
        differenceOf(newGameState.board, andActualGameState.board),
        player
      ]
    ),
    map(
      ([newState, actualState, boardDifferences, player]: [
        GameState,
        GameState,
        BoardDifferences,
        Player
      ]) =>
        applyRules(this.rules)(
          Object.freeze(newState),
          Object.freeze(actualState),
          boardDifferences
        )
    )
  );

  constructor(
    @Inject(GAME_STATE_STORE) private store: GameEngineStore,
    private turnSerivce: TurnService,
    @Optional() @Inject(GAME_RULES) private rules: GameRules = []
  ) {}

  applyRules(state: GameState) {
    this.applyRules$.next(state);
  }
}
