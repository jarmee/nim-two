import { BoardBuilder } from "../../board/board.builder";
import { BoardDifferences } from "../../board/board.model";
import { GameState, GameStatus } from "../../game-engine/game-engine.model";
import { isGameOver, isMaximumOfMatchesExceeded } from "./nim.rules";

describe("NimRules", () => {
  describe("isMaximumOfMatchesExceeded", () => {
    it("should return the given game state if the game status is errornous", () => {
      const errornousState: GameState = {
        status: GameStatus.Errornous,
        board: BoardBuilder.create()
          .addRowWithColumns(true, false, false, false)
          .build()
      };
      const actualState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(false, false, false, false)
          .build()
      };
      const differences: BoardDifferences = [
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "0"]
        }
      ];

      const actual = isMaximumOfMatchesExceeded(
        errornousState,
        actualState,
        differences
      )(errornousState);

      expect(actual).toEqual(errornousState);
    });

    it("should return the new board if the board differences is one", () => {
      const newState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(true, false, false, false)
          .build()
      };
      const actualState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(false, false, false, false)
          .build()
      };
      const differences: BoardDifferences = [
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "0"]
        }
      ];
      const actual = isMaximumOfMatchesExceeded(
        newState,
        actualState,
        differences
      )(newState);

      expect(actual).toEqual(newState);
    });

    it("should return the new board if the board differences is two", () => {
      const newState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(true, true, false, false)
          .build()
      };
      const currentBoard: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(false, false, false, false)
          .build()
      };
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
        newState,
        currentBoard,
        differences
      )(newState);

      expect(actual).toEqual(newState);
    });

    it("should return the new board if the board differences is three", () => {
      const newState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(true, true, true, false)
          .build()
      };
      const actualState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(false, false, false, false)
          .build()
      };
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
        newState,
        actualState,
        differences
      )(newState);

      expect(actual).toEqual(newState);
    });

    it("should return the actual board if the board differences is greater three", () => {
      const newState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(true, true, true, true)
          .build()
      };
      const actualState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(false, false, false, false)
          .build()
      };
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
        newState,
        actualState,
        differences
      )(newState);

      expect(actual).toEqual({
        ...actualState,
        status: GameStatus.Errornous
      });
    });
  });

  describe("isGameOver", () => {
    it("should return the given state if the game status is errornous", () => {
      const errornousState: GameState = {
        status: GameStatus.Errornous,
        board: BoardBuilder.create()
          .addRowWithColumns(true, false, false, false)
          .build()
      };
      const actualState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(false, false, false, false)
          .build()
      };
      const differences: BoardDifferences = [
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "0"]
        }
      ];

      const actual = isGameOver(errornousState, actualState, differences)(
        errornousState
      );

      expect(actual).toBe(errornousState);
    });

    it("should set the game status to game over if the all columns of the new state are set to true", () => {
      const newState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(true, true, true, true)
          .build()
      };
      const actualState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(false, false, false, false)
          .build()
      };
      const differences: BoardDifferences = [
        {
          newColumn: { value: true, player: null },
          currentColumn: { value: false, player: null },
          path: ["0", "0"]
        }
      ];

      const actual = isGameOver(newState, actualState, differences)(newState);

      expect(actual.status).toBe(GameStatus.GameOverPlayerOne);
    });
  });

  describe("hasChanged", () => {
    //TODO: write tests
  });
});
