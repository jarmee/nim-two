import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GameState, GAME_STATE_STORE } from "./game-engine.model";
import { GameEngineStore } from "./game-engine.store";
import { map } from "rxjs/operators";
import { Board, Columns } from "../board/board.model";

const calculateAmount = map((board: Board) => {
  return Object.keys(board)
    .map((rowKey: string) => board[rowKey])
    .map(
      (columns: Columns) =>
        Object.keys(columns).filter((columnKey: string) => !columns[columnKey])
          .length
    )
    .reduce(
      (amount: number, columnCount: number) => (amount += columnCount),
      0
    );
});

@Injectable()
export class GameEngineService {
  amount$: Observable<number> = this.store.pipe(
    map((state: GameState) => state.board),
    calculateAmount
  );

  board$: Observable<Board> = this.store.pipe(
    map((state: GameState) => state.board)
  );

  constructor(@Inject(GAME_STATE_STORE) private store: GameEngineStore) {}

  executePlay(newState: Board) {
    this.store.next({
      board: newState
    });
  }
}
