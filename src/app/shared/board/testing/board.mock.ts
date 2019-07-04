import { BoardBuilder } from "../board.builder";
import { Board } from "../board.model";

export const boardFactory: () => Board = () =>
  BoardBuilder.create()
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
