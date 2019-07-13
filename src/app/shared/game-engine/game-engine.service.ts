import { Inject, Injectable, OnDestroy, Optional } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, skip, tap, withLatestFrom } from "rxjs/operators";
import { countColumnsOf, differenceOf, withColumnValueFalseFilter } from "../board/board.helpers";
import { Board, BoardDifferences } from "../board/board.model";
import { SubscriptionService } from "../state/subscription.service";
import { applyRules, setPlayerForBoardIn } from "./game-engine.helpers";
import { GameRules, GameState, GameStatus, GAME_RULES, GAME_STATE_STORE } from "./game-engine.model";
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

  state$: Observable<GameState> = this.store;

  amount$: Observable<number> = this.state$.pipe(
    map((state: GameState) => state.board),
    map((board: Board) => countColumnsOf(board, withColumnValueFalseFilter))
  );

  board$: Observable<Board> = this.state$.pipe(
    map((state: GameState) => state.board)
  );

  status$: Observable<GameStatus> = this.state$.pipe(
    map((state: GameState) => state.status)
  );

  constructor(
    @Inject(GAME_STATE_STORE) private store: GameEngineStore,
    private turnSerivce: TurnService,
    @Optional() @Inject(GAME_RULES) private rules: GameRules = []
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
        tap((newState: GameState) => this.store.next(newState)),
        tap((newState: GameState) => {
          if (newState.status !== GameStatus.Errornous) {
            this.turnSerivce.switchPlayer();
          }
        }),
      )
    );
  }

  executePlay(newBoardState: Board) {
    this.gameLoop$.next({
      board: newBoardState
    });
  }

  reset() {
    this.store.reset();
  }
}
