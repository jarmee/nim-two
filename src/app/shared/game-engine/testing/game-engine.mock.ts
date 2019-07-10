import * as Factory from "factory.ts";
import { BoardBuilder } from "../../board/board.builder";
import { GameState, GameStatus } from "../game-engine.model";

export const gameStateFactory = Factory.Sync.makeFactory<GameState>({
  status: GameStatus.Fresh,
  board: BoardBuilder.create()
    .addRowWithColumns(
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false
    )
    .build()
});
