import { BoardBuilder } from "../../board/board.builder";
import { GameStatus } from "../../game-engine/game-engine.model";

export const NIM_GAME_STATE = {
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
};
