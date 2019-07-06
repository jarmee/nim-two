import { Inject, Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { map, skip, tap, withLatestFrom } from "rxjs/operators";
import {
  Board,
  BoardDifference,
  BoardDifferences,
  Column,
  Columns
} from "../board/board.model";
import { GameState, GAME_STATE_STORE } from "./game-engine.model";
import { GameEngineStore } from "./game-engine.store";

const calculateAmount = (board: Board) => {
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

@Injectable()
export class GameEngineService implements OnDestroy {
  private subscriptions: Subscription[] = [];
  private gameLoop$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  amount$: Observable<number> = this.store.pipe(
    map((state: GameState) => state.board),
    calculateAmountAndMap
  );

  board$: Observable<Board> = this.store.pipe(
    map((state: GameState) => state.board)
  );

  constructor(@Inject(GAME_STATE_STORE) private store: GameEngineStore) {
    this.subscriptions = [
      ...this.subscriptions,
      this.gameLoop$
        .asObservable()
        .pipe(
          skip(1),
          withLatestFrom(
            this.store
              .asObservable()
              .pipe(map((state: GameState) => state.board))
          ),
          //TODO Validation
          map(([newBoardState, actualBoardState]) => {
            if (
              calculateAmount(actualBoardState) -
                calculateAmount(newBoardState) >
              3
            ) {
              return {
                ...actualBoardState
              };
            }
            return newBoardState;
          }),
          tap((newBoardState: Board) =>
            this.store.next({
              board: newBoardState
            })
          )
          // TODO AI
        )
        .subscribe()
    ];
  }

  executePlay(newBoardState: Board) {
    this.gameLoop$.next(newBoardState);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    );
  }
}
