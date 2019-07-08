import { Inject, Injectable, OnDestroy, Optional } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { map, skip, tap, withLatestFrom } from "rxjs/operators";
import {
  Board,
  BoardDifference,
  BoardDifferences,
  Column,
  Columns
} from "../board/board.model";
import {
  GameRule,
  GameRules,
  GameState,
  GameStatus,
  GAME_AI_RULES,
  GAME_RULES,
  GAME_STATE_STORE
} from "./game-engine.model";
import { GameEngineStore } from "./game-engine.store";

export const calculateAmount = (board: Board) => {
  return Object.keys(board)
    .map((rowKey: string) => board[rowKey])
    .map(
      (columns: Columns) =>
        Object.keys(columns).filter(
          (columnKey: string) => !columns[columnKey].value
        ).length
    )
    .reduce(
      (amount: number, columnCount: number) => (amount += columnCount),
      0
    );
};

const calculateAmountAndMap = map(calculateAmount);

export const diff = (
  newBoard: Board,
  currentBoard: Board
): BoardDifferences => {
  if (!newBoard || !currentBoard) return [];

  return Object.keys(newBoard)
    .map(rowKey =>
      Object.keys(newBoard[rowKey]).map((columnKey: string) => ({
        newColumn: newBoard[rowKey][columnKey],
        currentColumn: currentBoard[rowKey][columnKey],
        path: [rowKey, columnKey]
      }))
    )
    .reduce(
      (flattenArray: [Column, Column][], columns: any) => [
        ...flattenArray,
        ...columns
      ],
      []
    )
    .filter(
      (difference: BoardDifference) =>
        difference.newColumn.value !== difference.currentColumn.value
    );
};

export const checkRules = (rules: GameRules) => (
  newState: GameState,
  actualState: GameState,
  boardDifferences: BoardDifferences
) => {
  if (!rules || !rules.length) return newState;
  return rules.reduce(
    (state: GameState, rule: GameRule) =>
      rule(newState, actualState, boardDifferences)(state),
    newState
  );
};

const checkRulesAndMap = (rules: GameRules) =>
  map(
    ([newState, actualState, boardDifferences]: [
      GameState,
      GameState,
      BoardDifferences
    ]) => checkRules(rules)(newState, actualState, boardDifferences)
  );

@Injectable()
export class GameEngineService implements OnDestroy {
  private subscriptions: Subscription[] = [];

  private gameLoop$: BehaviorSubject<Partial<GameState>> = new BehaviorSubject<
    Partial<GameState>
  >(null);

  amount$: Observable<number> = this.store.pipe(
    map((state: GameState) => state.board),
    calculateAmountAndMap
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
    @Optional() @Inject(GAME_AI_RULES) private aiRules: GameRules = []
  ) {
    this.subscriptions = [
      ...this.subscriptions,
      this.gameLoop$
        .asObservable()
        .pipe(
          skip(1),
          withLatestFrom(this.store),
          map(([newGameState, actualGameState]: [GameState, GameState]) => [
            newGameState,
            actualGameState,
            diff(newGameState.board, actualGameState.board)
          ]),
          checkRulesAndMap(this.rules),
          tap((newState: GameState) => this.store.next(newState))
        )
        .subscribe()
    ];
  }

  executePlay(newBoardState: Board) {
    this.gameLoop$.next({
      status: GameStatus.InProgress,
      board: newBoardState
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
