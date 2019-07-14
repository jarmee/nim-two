import { InjectionToken } from '@angular/core';
import { Board } from '../board/board.model';
import { GameStateStore } from './state.store';

export enum GameStatus {
  Valid = 'Valid',
  Errornous = 'Errornous',
  GameOver = 'Game Over'
}
export interface GameState {
  status?: GameStatus;
  errorMessage?: string;
  board: Board;
}

export const initialGameState: GameState = {
  status: GameStatus.Valid,
  board: null
};

export const STATE_STORE: InjectionToken<GameState> = new InjectionToken<GameStateStore>('GAME_STATE_STORE');
