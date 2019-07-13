import { Inject, Injectable, OnDestroy, Optional } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { delay, filter, map, skip, tap, withLatestFrom } from "rxjs/operators";
import {
  countColumnsOf,
  differenceOf,
  withColumnValueFalseFilter
} from "../board/board.helpers";
import { Board, BoardDifferences } from "../board/board.model";
import { SubscriptionService } from "../state/subscription.service";
import {
  applyRules,
  calculateState,
  setPlayerForBoardIn
} from "./game-engine.helpers";
import {
  AiRules,
  GameRules,
  GameState,
  GameStatus,
  GAME_AI_RULES,
  GAME_RULES,
  GAME_STATE_STORE
} from "./game-engine.model";
import { GameEngineStore } from "./game-engine.store";
import { Player } from "./turn/turn.model";
import { TurnService } from "./turn/turn.service";

@Injectable()
export class GameEngineService extends SubscriptionService
  implements OnDestroy {
  gameLoop$: BehaviorSubject<Partial<GameState>> = new BehaviorSubject<
    Partial<GameState>
  >(null);

  private aiLoop$: BehaviorSubject<Partial<GameState>> = new BehaviorSubject<
    Partial<GameState>
  >(null);

  amount$: Observable<number> = this.store.pipe(
    map((state: GameState) => state.board),
    map((board: Board) => countColumnsOf(board, withColumnValueFalseFilter))
  );

  board$: Observable<Board> = this.store.pipe(
    map((state: GameState) => state.board)
  );

  status$: Observable<GameStatus> = this.store.pipe(
    map((state: GameState) => state.status)
  );

  constructor(
    @Inject(GAME_STATE_STORE) private store: GameEngineStore,
    private turnSerivce: TurnService,
    @Optional() @Inject(GAME_RULES) private rules: GameRules = [],
    @Optional() @Inject(GAME_AI_RULES) private aiRules: AiRules = []
  ) {
    super();
    this.subscribeTo(
      this.gameLoop$.pipe(
        skip(1),
        withLatestFrom(this.store, this.turnSerivce.selectedPlayer$),
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
          ]) => [newState, actualState, boardDifferences, player]
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
        ),
        tap(() => this.turnSerivce.switchPlayer()),
        tap((newState: GameState) => this.store.next(newState)),
        tap((newState: GameState) => this.aiLoop$.next(newState))
      )
    );
    this.subscribeTo(
      this.aiLoop$.pipe(
        skip(1),
        filter((state: GameState) => state.status === GameStatus.HumanPlay),
        delay(1000),
        map((state: GameState) => ({
          ...state,
          status: GameStatus.AiPlay
        })),
        map((state: GameState) =>
          calculateState(this.aiRules)(Object.freeze(state))
        ),
        tap((newState: GameState) => {
          this.gameLoop$.next(newState);
        })
      )
    );
  }

  executePlay(newBoardState: Board) {
    this.gameLoop$.next({
      status: GameStatus.HumanPlay,
      board: newBoardState
    });
  }

  reset() {
    this.store.reset();
  }
}
