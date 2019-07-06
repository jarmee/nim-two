import { BoardBuilder } from "../../board/board.builder";

export const NIM_GAME_BOARD = {
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
