import { BoardBuilder } from "./board.builder";
import {
  countColumnsOf,
  differenceOf,
  findColumnOf,
  withColumnValueFalseFilter
} from "./board.helpers";
import { Board, Column, Path } from "./board.model";

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

  describe("differenceOf", () => {
    it("should return an empty array if both Board objects have the same values", () => {
      const newBoard: Board = BoardBuilder.create()
        .addRowWithColumns(false)
        .build();

      const currentBoard: Board = BoardBuilder.create()
        .addRowWithColumns(false)
        .build();

      const actual = differenceOf(newBoard, currentBoard);

      expect(actual).toEqual([]);
    });

    it("should return a diff of the two boards (newBoard=null)", () => {
      const newBoard: Board = null;
      const currentBoard: Board = BoardBuilder.create()
        .addRowWithColumns(true)
        .build();
      const currentColumn: Column = currentBoard[0][0];

      const actual = differenceOf(newBoard, currentBoard);

      expect(actual).toEqual([
        { newColumn: null, currentColumn, path: ["0", "0"] }
      ]);
    });

    it("should return a diff of the two boards (currentBoard=null)", () => {
      const newBoard: Board = BoardBuilder.create()
        .addRowWithColumns(false)
        .build();
      const newColumn: Column = newBoard[0][0];
      const currentBoard: Board = null;

      const actual = differenceOf(newBoard, currentBoard);

      expect(actual).toEqual([
        { newColumn, currentColumn: null, path: ["0", "0"] }
      ]);
    });

    it("should return a diff of the two boards", () => {
      const newBoard: Board = BoardBuilder.create()
        .addRowWithColumns(false)
        .build();
      const newColumn: Column = newBoard[0][0];
      const currentBoard: Board = BoardBuilder.create()
        .addRowWithColumns(true)
        .build();
      const currentColumn: Column = currentBoard[0][0];

      const actual = differenceOf(newBoard, currentBoard);

      expect(actual).toEqual([{ newColumn, currentColumn, path: ["0", "0"] }]);
    });
  });

  describe("countColumnsOf", () => {
    it("should return 0 if the board is null", () => {
      const board = null;
      const withFilter = (column: Column) => !column.value;

      const actual = countColumnsOf(board, withFilter);

      expect(actual).toBe(0);
    });

    it("should return the count of coulmns which match the filter", () => {
      const board = BoardBuilder.create()
        .addRowWithColumns(false, false, true)
        .addRowWithColumns(true, true, false)
        .build();
      const withFilter = (column: Column) => !column.value;

      const actual = countColumnsOf(board, withFilter);

      expect(actual).toBe(3);
    });
  });

  describe("withColumnValueFalseFilter", () => {
    it("should return false", () => {
      const column: any = {
        value: true
      };

      const actual = withColumnValueFalseFilter(column);

      expect(actual).toBe(false);
    });

    it("should return true", () => {
      const column: any = {
        value: false
      };

      const actual = withColumnValueFalseFilter(column);

      expect(actual).toBe(true);
    });
  });
});
