import * as faker from 'faker';
import { countColumnsOf, withColumnValueFalseFilter } from '../../game-engine/board/board.helpers';
import { Board } from '../../game-engine/board/board.model';
import { GameState } from '../../game-engine/state/state.model';
import { gameStateFactory } from '../../game-engine/testing/game-engine.mock';
import { calculatePlayRule, isPlayable, optimalStickCount, randomNumberOfMatchesToPick } from './nim.ai';
import { MAX_MATCHES, MIN_MATCHES } from './nim.model';

describe('NimAi', () => {
  describe('randomNumberOfMatchesToPick', () => {
    it('should return a number between a given min and given max', () => {
      const actual = randomNumberOfMatchesToPick(MIN_MATCHES, MAX_MATCHES);

      expect(actual).toBeGreaterThanOrEqual(MIN_MATCHES);
      expect(actual).toBeLessThanOrEqual(MAX_MATCHES);
    });
  });

  describe('isPlayable', () => {
    it('should return true if the value of the column is false', () => {
      const column = {
        value: false
      };

      expect(isPlayable(column)).toBe(true);
    });

    it('should return false if the value of the column is true', () => {
      const column = {
        value: true
      };

      expect(isPlayable(column)).toBe(false);
    });
  });

  describe('calculatePlay', () => {
    describe('calculate a new game state', () => {
      it('should not change anything if all columns marked as false', () => {
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

        const actual = calculatePlayRule(Object.freeze(gameState))(gameState);

        expect(actual.board).toEqual(board);
      });

      it('should set amount of columns to true', () => {
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
            },
            4: {
              value: false,
              player: null,
              errorMessage: null
            }
          }
        };
        const gameState: GameState = {
          board
        };
        const actual = calculatePlayRule(Object.freeze(gameState))(gameState);

        expect(countColumnsOf(actual.board, withColumnValueFalseFilter)).toBeGreaterThanOrEqual(1);
        expect(countColumnsOf(actual.board, withColumnValueFalseFilter)).toBeLessThanOrEqual(3);
      });
    });
  });

  describe('optimalStickCount', () => {
    const min = 1;
    const max = 3;
    it('should return 2', () => {
      const leftPlayableColumns = 3;
      const expected = 2;
      expect(optimalStickCount(leftPlayableColumns, min, max)).toBe(expected);
    });

    it('should return 1', () => {
      const leftPlayableColumns = 5;
      const expected = 1;
      expect(optimalStickCount(leftPlayableColumns, min, max)).toBe(expected);
    });

    it('should return 1', () => {
      const leftPlayableColumns = 6;
      const expected = 1;
      expect(optimalStickCount(leftPlayableColumns, min, max)).toBe(expected);
    });

    it('should return 3', () => {
      const leftPlayableColumns = 8;
      const expected = 3;
      expect(optimalStickCount(leftPlayableColumns, min, max)).toBe(expected);
    });
  });
});
