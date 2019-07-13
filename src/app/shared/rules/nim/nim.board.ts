import { BoardBuilder } from "../../board/board.builder";

export const NIM_BOARD = BoardBuilder.create()
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
  .build();
