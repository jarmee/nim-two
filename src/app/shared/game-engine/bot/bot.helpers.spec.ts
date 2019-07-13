import { BoardBuilder } from "../board/board.builder";
import { gameStateFactory } from "../testing/game-engine.mock";
import { calculateState } from "./bot.helpers";

describe("BotHelpers", () => {
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
});
