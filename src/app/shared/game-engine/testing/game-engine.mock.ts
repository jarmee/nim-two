import * as Factory from 'factory.ts';
import { BoardBuilder } from '../board/board.builder';
import { GameState, GameStatus } from '../state/state.model';

export const gameStateFactory = Factory.Sync.makeFactory<GameState>({
  status: GameStatus.Valid,
  board: BoardBuilder.create()
    .addRowWithColumns(false, false, false, false, false, false, false, false, false, false, false, false, false)
    .build()
});
