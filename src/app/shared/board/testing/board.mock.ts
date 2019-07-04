import { Board, Columns } from "../board.model";
import * as Factory from "factory.ts";
import { BoardBuilder } from "../board.builder";

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
