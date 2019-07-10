import { Inject, Injectable, OnDestroy, Optional } from "@angular/core";
import { cloneDeep } from "lodash";
import { BehaviorSubject, Observable } from "rxjs";
import { delay, filter, map, skip, tap, withLatestFrom } from "rxjs/operators";
import {
  countColumnsOf,
  differenceOf,
  withColumnValueFalseFilter
} from "../board/board.helpers";
import { Board, BoardDifferences } from "../board/board.model";
import { SubscriptionService } from "../subscription.service";
import {
  AiRule,
  AiRules,
  GameRule,
  GameRules,
  GameState,
  GameStatus,
  GAME_AI_RULES,
  GAME_RULES,
  GAME_STATE_STORE
} from "./game-engine.model";
import { GameEngineStore } from "./game-engine.store";

export const applyRules = (rules: GameRules) => (
  newState: GameState,
  actualState: GameState,
  boardDifferences: BoardDifferences
) => {
  if (!rules || !rules.length) return newState;
  return rules.reduce(
    (state: GameState, rule: GameRule) =>
      rule(newState, actualState, boardDifferences)(state),
    cloneDeep(newState)
  );
};

const applyRulesAndMap = (rules: GameRules) =>
  map(
    ([newState, actualState, boardDifferences]: [
      GameState,
      GameState,
      BoardDifferences
    ]) =>
      applyRules(rules)(
        Object.freeze(newState),
        Object.freeze(actualState),
        boardDifferences
      )
  );

export const calculateState = (rules: AiRules) => (state: GameState) => {
  if (!rules || !rules.length) return state;
  return rules.reduce(
    (calculateState: GameState, rule: AiRule) => rule(state)(calculateState),
    cloneDeep(state)
  );
};

const calculateStateAndMap = (rules: AiRules) =>
  map((state: GameState) => calculateState(rules)(Object.freeze(state)));

@Injectable()
export class GameEngineService extends SubscriptionService
  implements OnDestroy {
  private gameLoop$: BehaviorSubject<Partial<GameState>> = new BehaviorSubject<
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
    @Optional() @Inject(GAME_RULES) private rules: GameRules = [],
    @Optional() @Inject(GAME_AI_RULES) private aiRules: AiRules = []
  ) {
    super();
    this.subscribeTo(
      this.gameLoop$.pipe(
        skip(1),
        withLatestFrom(this.store),
        map(([newGameState, actualGameState]: [GameState, GameState]) => [
          newGameState,
          actualGameState,
          differenceOf(newGameState.board, actualGameState.board)
        ]),
        applyRulesAndMap(this.rules),
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
        calculateStateAndMap(this.aiRules),
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
