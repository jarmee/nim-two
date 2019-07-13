import { cloneDeep } from "lodash";
import { BoardBuilder } from "../../board/board.builder";
import { BoardDifferences } from "../../board/board.model";
import { GameState, GameStatus } from "../../game-engine/state/state.model";
import {
  isGameOverRule,
  isMaximumOfMatchesExceededRule,
  MAXIMUM_OF_MATCHES_EXCEEDED_ERROR,
  preventBoardHasNoChangesRule
} from "./nim.rules";

describe("NimRules", () => {
  describe("isMaximumOfMatchesExceededRule", () => {
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

      const actual = isMaximumOfMatchesExceededRule(
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
      const actual = isMaximumOfMatchesExceededRule(
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
      const actual = isMaximumOfMatchesExceededRule(
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
      const actual = isMaximumOfMatchesExceededRule(
        newState,
        actualState,
        differences
      )(newState);

      expect(actual).toEqual(newState);
    });

    describe("match count exceedes maximum", () => {
      let newState: GameState;
      let actualState: GameState;
      let differences: BoardDifferences;

      beforeEach(() => {
        newState = {
          board: BoardBuilder.create()
            .addRowWithColumns(true, true, true, true)
            .build()
        };

        actualState = {
          board: BoardBuilder.create()
            .addRowWithColumns(false, false, false, false)
            .build()
        };

        differences = [
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
      });

      it("should set the game status as errornous", () => {
        const actual = isMaximumOfMatchesExceededRule(
          newState,
          actualState,
          differences
        )(newState);

        expect(actual.status).toEqual(GameStatus.Errornous);
      });

      it("should return the expected state", () => {
        const expectedState: GameState = {
          board: {
            0: {
              0: {
                value: false,
                player: null,
                errorMessage: MAXIMUM_OF_MATCHES_EXCEEDED_ERROR
              },
              1: {
                value: false,
                player: null,
                errorMessage: MAXIMUM_OF_MATCHES_EXCEEDED_ERROR
              },
              2: {
                value: false,
                player: null,
                errorMessage: MAXIMUM_OF_MATCHES_EXCEEDED_ERROR
              },
              3: {
                value: false,
                player: null,
                errorMessage: MAXIMUM_OF_MATCHES_EXCEEDED_ERROR
              }
            }
          },
          status: GameStatus.Errornous
        };

        const actual = isMaximumOfMatchesExceededRule(
          newState,
          actualState,
          differences
        )(newState);

        expect(actual).toEqual(expectedState);
      });
    });
  });

  describe("isGameOverRule", () => {
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

      const actual = isGameOverRule(errornousState, actualState, differences)(
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

      const actual = isGameOverRule(newState, actualState, differences)(
        newState
      );

      expect(actual.status).toBe(GameStatus.GameOver);
    });
  });

  describe("preventBoardHasNoChangesRule", () => {
    it("should return the given state if the state is errornous", () => {
      const errornousState: GameState = {
        status: GameStatus.Errornous,
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

      const actual = preventBoardHasNoChangesRule(
        errornousState,
        actualState,
        differences
      )(errornousState);

      expect(actual).toBe(errornousState);
    });

    it("should return the actual state marked as errornous if the board did not change", () => {
      const newState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(true, true, true, true)
          .build()
      };
      const actualState: GameState = {
        board: BoardBuilder.create()
          .addRowWithColumns(true, true, true, true)
          .build()
      };
      const errornousState = {
        ...cloneDeep(actualState),
        status: GameStatus.Errornous
      };
      const differences: BoardDifferences = [];

      const actual = preventBoardHasNoChangesRule(
        newState,
        actualState,
        differences
      )(newState);

      expect(actual).toEqual(errornousState);
    });
  });
});
