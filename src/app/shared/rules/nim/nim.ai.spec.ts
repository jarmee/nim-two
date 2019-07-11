import * as faker from "faker";
import { Board } from "../../board/board.model";
import { GameState } from "../../game-engine/game-engine.model";
import { gameStateFactory } from "../../game-engine/testing/game-engine.mock";
import {
  calculatePlayRule,
  isPlayable,
  randomNumberOfMatchesToPick
} from "./nim.ai";
import { MAX_MATCHES, MIN_MATCHES } from "./nim.model";

describe("NimAi", () => {
  describe("randomNumberOfMatchesToPick", () => {
    it("should return a number between a given min and given max", () => {
      const actual = randomNumberOfMatchesToPick(MIN_MATCHES, MAX_MATCHES);

      expect(actual).toBeGreaterThanOrEqual(MIN_MATCHES);
      expect(actual).toBeLessThanOrEqual(MAX_MATCHES);
    });
  });

  describe("isPlayable", () => {
    it("should return true if the value of the column is false", () => {
      const column = {
        value: false
      };

      expect(isPlayable(column)).toBe(true);
    });

    it("should return false if the value of the column is true", () => {
      const column = {
        value: true
      };

      expect(isPlayable(column)).toBe(false);
    });
  });

  describe("calculatePlay", () => {
    describe("calculate a new game state", () => {
      it("should not change anything if all columns marked as false", () => {
        const board: Board = {
          0: {
            0: {
              value: true,
              player: faker.name.firstName(),
              errorMessage: null
            },
            1: {
              value: true,
              player: faker.name.firstName(),
              errorMessage: null
            },
            2: {
              value: true,
              player: faker.name.firstName(),
              errorMessage: null
            },
            3: {
              value: true,
              player: faker.name.firstName(),
              errorMessage: null
            }
          }
        };
        const gameState: GameState = gameStateFactory
          .extend({
            board
          })
          .build();

        const actual = calculatePlayRule(() => MAX_MATCHES)(
          Object.freeze(gameState)
        )(gameState);

        expect(actual.board).toEqual(board);
      });

      fit("should set amount of columns to true", () => {
        const oponent = faker.name.firstName();
        const board: Board = {
          0: {
            0: {
              value: true,
              player: oponent,
              errorMessage: null
            },
            1: {
              value: false,
              player: null,
              errorMessage: null
            },
            2: {
              value: false,
              player: null,
              errorMessage: null
            },
            3: {
              value: false,
              player: null,
              errorMessage: null
            }
          }
        };

        const expectedBoard: Board = {
          0: {
            0: {
              value: true,
              player: oponent,
              errorMessage: null
            },
            1: {
              value: true,
              player: "🤖",
              errorMessage: null
            },
            2: {
              value: true,
              player: "🤖",
              errorMessage: null
            },
            3: {
              value: true,
              player: "🤖",
              errorMessage: null
            }
          }
        };
        const gameState: GameState = {
          board
        };

        const actual = calculatePlayRule(() => MAX_MATCHES)(
          Object.freeze(gameState)
        )(gameState);

        expect(actual.board).toEqual(expectedBoard);
      });
    });
  });
});
