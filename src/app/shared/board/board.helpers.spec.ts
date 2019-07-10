import { BoardBuilder } from "./board.builder";
import { findColumnOf } from "./board.helpers";
import { Board, Path } from "./board.model";

describe("BoardHelpers", () => {
  describe("findColumnOf", () => {
    it("should return null if the given board is null", () => {
      const board: Board = null;
      const path: Path = ["0", "0"];

      const actual = findColumnOf(board, path);

      expect(actual).toBeNull();
    });

    it("should return null if the path is null", () => {
      const board: Board = BoardBuilder.create()
        .addRowWithColumns(true)
        .build();
      const path: Path = null;

      const actual = findColumnOf(board, path);

      expect(actual).toBeNull();
    });

    it("should return null if the path is empty", () => {
      const board: Board = BoardBuilder.create()
        .addRowWithColumns(true)
        .build();
      const path: Path = [];

      const actual = findColumnOf(board, path);

      expect(actual).toBeNull();
    });

    it("should return null if the path is invalid", () => {
      const board: Board = BoardBuilder.create()
        .addRowWithColumns(true)
        .build();
      const path: Path = ["0", "1"];

      const actual = findColumnOf(board, path);

      expect(actual).toBeNull();
    });

    it("should return the colum of the board", () => {
      const board: Board = BoardBuilder.create()
        .addRowWithColumns(true)
        .build();
      const path: Path = ["0", "0"];

      const actual = findColumnOf(board, path);

      expect(actual).toBe(board["0"]["0"]);
    });
  });
});
