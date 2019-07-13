import * as faker from "faker";
import { BoardBuilder } from "../board/board.builder";
import { BoardDifferences } from "../board/board.model";
import { applyRules, calculateState, setPlayerForBoardIn } from "./game-engine.helpers";
import { GameState } from "./game-engine.model";
import { gameStateFactory } from "./testing/game-engine.mock";
import { Player, playerFactory, PlayerType } from "./turn/turn.model";

describe("GameEngineHelpers", () => {
  describe("applyRules", () => {
    const newState: GameState = gameStateFactory
      .extend({
        board: BoardBuilder.create()
          .addRowWithColumns(true)
          .build()
      })
      .build();
    const actualState: GameState = gameStateFactory
      .extend({
        board: BoardBuilder.create()
          .addRowWithColumns(false)
          .build()
      })
      .build();
    const boardDifferences: BoardDifferences = [
      {
        newColumn: newState.board[0][0],
        currentColumn: actualState.board[0][0],
        path: ["0", "0"]
      }
    ];

    it("should return the provided newState if no rules are given", () => {
      const actual = applyRules([])(newState, actualState, boardDifferences);

      expect(actual).toEqual(newState);
    });

    it("should call the provided rule", () => {
      const rule = jest.fn().mockReturnValue(state => newState);

      const actual = applyRules([rule])(
        newState,
        actualState,
        boardDifferences
      );

      expect(actual).toEqual(newState);
      expect(rule).toHaveBeenCalledWith(
        newState,
        actualState,
        boardDifferences
      );
    });
  });

  describe("calculateState", () => {
    const gameState = gameStateFactory.build();

    it("should return the given state if no rule is provided", () => {
      const actual = calculateState([])(gameState);

      expect(actual).toEqual(gameState);
    });

    it("should call the provided rule", () => {
      const calculatedState = gameStateFactory
        .extend({
          board: BoardBuilder.create()
            .addRowWithColumns(
              true,
              true,
              true,
              true,
              true,
              false,
              false,
              false,
              false,
              false,
              false,
              false,
              false
            )
            .build()
        })
        .build();
      const rule = jest.fn().mockReturnValue(state => calculatedState);

      const actual = calculateState([rule])(gameState);

      expect(actual).toEqual(calculatedState);
      expect(rule).toHaveBeenCalledWith(gameState);
    });
  });

  describe("setPlayerForBoardIn", () => {
    const state: GameState = gameStateFactory
      .extend({
        board: BoardBuilder.create()
          .addRowWithColumns(true, true, true, true)
          .build()
      })
      .build();
    const actualState: GameState = gameStateFactory
      .extend({
        board: BoardBuilder.create()
          .addRowWithColumns(false, false, false, true)
          .build()
      })
      .build();
    const boardDifferences: BoardDifferences = [];
    const player: Player = playerFactory(
      faker.name.firstName(),
      PlayerType.Human
    );

    it("should return null if the game state is null", () => {
      expect(setPlayerForBoardIn(null, actualState, player)).toBeNull();
    });

    it("should return a game state", () => {
      expect(setPlayerForBoardIn(state, null, player)).toEqual({
        ...state,
        board: {
          0: {
            0: {
              errorMessage: null,
              value: true,
              player: player.name
            },
            1: {
              errorMessage: null,
              value: true,
              player: player.name
            },
            2: {
              errorMessage: null,
              value: true,
              player: player.name
            },
            3: {
              errorMessage: null,
              value: true,
              player: player.name
            }
          }
        }
      });
    });

    it("should set the player name to the changed columns", () => {
      expect(setPlayerForBoardIn(state, actualState, player)).toEqual({
        ...state,
        board: {
          0: {
            0: {
              errorMessage: null,
              value: true,
              player: player.name
            },
            1: {
              errorMessage: null,
              value: true,
              player: player.name
            },
            2: {
              errorMessage: null,
              value: true,
              player: player.name
            },
            3: {
              errorMessage: null,
              value: true,
              player: null
            }
          }
        }
      });
    });
  });
});
