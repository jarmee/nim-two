import { exchangeColumnsOf } from "../../board/board.helpers";
import { Column } from "../../board/board.model";
import {
  AiRule,
  AiRules,
  GameState
} from "../../game-engine/game-engine.model";

export function randomNumberOfMatchesToPick(min: number, max: number): number {
  return Math.round(Math.random() * max) || min;
}

export function isPlayable(column: Column): boolean {
  return !column.value;
}

export function ifValueIsPlayable(amountOfMatches: number) {
  return (column: Column) => {
    if (isPlayable(column) && amountOfMatches > 0) {
      amountOfMatches--;
      return {
        ...column,
        value: true,
        player: "🤖"
      };
    } else {
      return column;
    }
  };
}

export const calculatePlayRule: (amountOfMatches: () => number) => AiRule = (
  amountOfMatchesProducer: () => number
) => (state: GameState) => {
  return (calculatedState: GameState) => {
    let amountOfMatches = amountOfMatchesProducer();
    return {
      ...calculatedState,
      board: exchangeColumnsOf(
        calculatedState.board,
        ifValueIsPlayable(amountOfMatches)
      )
    };
  };
};

export const NIM_KI_RULES: AiRules = [
  calculatePlayRule(() => randomNumberOfMatchesToPick(1, 3))
];
