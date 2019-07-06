import { BoardBuilder } from "../../board/board.builder";
import { Board, BoardDifferences } from "../../board/board.model";
import { isMaximumOfMatchesExceeded } from "./nim.rules";

describe("NimRules", () => {
  describe("isMaximumOfMatchesExceeded", () => {
    it("should return the new board if the board differences is one", () => {
      const newBoard: Board = BoardBuilder.create()
        .addRowWithColumns(true, false, false, false)
        .build();
      const currentBoard: Board = BoardBuilder.create()
        .addRowWithColumns(false, false, false, false)
        .build();
      const differences: BoardDifferences = [
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "0"]
        }
      ];
      const actual = isMaximumOfMatchesExceeded(
        newBoard,
        currentBoard,
        differences
      )({});

      expect(actual).toEqual(newBoard);
    });

    it("should return the new board if the board differences is two", () => {
      const newBoard: Board = BoardBuilder.create()
        .addRowWithColumns(true, true, false, false)
        .build();
      const currentBoard: Board = BoardBuilder.create()
        .addRowWithColumns(false, false, false, false)
        .build();
      const differences: BoardDifferences = [
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "0"]
        },
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "1"]
        }
      ];
      const actual = isMaximumOfMatchesExceeded(
        newBoard,
        currentBoard,
        differences
      )({});

      expect(actual).toEqual(newBoard);
    });

    it("should return the new board if the board differences is three", () => {
      const newBoard: Board = BoardBuilder.create()
        .addRowWithColumns(true, true, true, false)
        .build();
      const currentBoard: Board = BoardBuilder.create()
        .addRowWithColumns(false, false, false, false)
        .build();
      const differences: BoardDifferences = [
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "0"]
        },
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "1"]
        },
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "2"]
        }
      ];
      const actual = isMaximumOfMatchesExceeded(
        newBoard,
        currentBoard,
        differences
      )({});

      expect(actual).toEqual(newBoard);
    });

    it("should return the actual board if the board differences is greater three", () => {
      const newBoard: Board = BoardBuilder.create()
        .addRowWithColumns(true, true, true, true)
        .build();
      const currentBoard: Board = BoardBuilder.create()
        .addRowWithColumns(false, false, false, false)
        .build();
      const differences: BoardDifferences = [
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "0"]
        },
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "1"]
        },
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "2"]
        },
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "3"]
        }
      ];
      const actual = isMaximumOfMatchesExceeded(
        newBoard,
        currentBoard,
        differences
      )({});

      expect(actual).toEqual(currentBoard);
    });
  });
});
