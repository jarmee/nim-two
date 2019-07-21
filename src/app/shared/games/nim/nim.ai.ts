import { countColumnsOf, exchangeColumnsOf, withColumnValueFalseFilter } from '../../game-engine/board/board.helpers';
import { Column } from '../../game-engine/board/board.model';
import { AiRules } from '../../game-engine/bot/bot.model';
import { GameState } from '../../game-engine/state/state.model';

export function randomNumberOfMatchesToPick(min: number, max: number): number {
  return Math.round(Math.random() * max) || min;
}

export function optimalStickCount(leftPlayableColumns: number, min: number, max: number): number {
  return (leftPlayableColumns - 1) % (max + 1) || min;
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
        value: true
      };
    } else {
      return column;
    }
  };
}

export function calculatePlayRule(state: GameState) {
  return (calculatedState: GameState) => {
    // tslint:disable-next-line
    let amountOfMatches = randomNumberOfMatchesToPick(1, 3);
    return {
      ...calculatedState,
      board: exchangeColumnsOf(calculatedState.board, ifValueIsPlayable(amountOfMatches))
    };
  };
}

export function calculatePlayRuleWithOptimalStickCount(state: GameState) {
  return (calculatedState: GameState) => {
    // tslint:disable-next-line
    const leftPlayableColumns = countColumnsOf(calculatedState.board, withColumnValueFalseFilter);
    let amountOfMatches = optimalStickCount(leftPlayableColumns, 1, 3);
    return {
      ...calculatedState,
      board: exchangeColumnsOf(calculatedState.board, ifValueIsPlayable(amountOfMatches))
    };
  };
}

export const NIM_AI_RULES: AiRules = [calculatePlayRuleWithOptimalStickCount];
