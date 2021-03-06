import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { countColumnsOf, withColumnValueFalseFilter } from '../board/board.helpers';
import { Board } from '../board/board.model';
import { GameState, GameStatus, STATE_STORE } from './state.model';
import { GameStateStore } from './state.store';

@Injectable()
export class StateService {
  state$: Observable<GameState> = this.store;

  errorCode$: Observable<string> = this.store.pipe(map((state: GameState) => state.errorMessage));

  amount$: Observable<number> = this.state$.pipe(
    map((state: GameState) => state.board),
    map((board: Board) => countColumnsOf(board, withColumnValueFalseFilter))
  );

  board$: Observable<Board> = this.state$.pipe(map((state: GameState) => state.board));

  status$: Observable<GameStatus> = this.state$.pipe(map((state: GameState) => state.status));

  constructor(@Inject(STATE_STORE) private store: GameStateStore) {}

  updateState(state: Partial<GameState>) {
    this.store.next(state);
  }

  resetState() {
    this.store.reset();
  }
}
