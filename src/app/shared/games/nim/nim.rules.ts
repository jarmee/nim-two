import { cloneDeep } from "lodash";
import {
  countColumnsOf,
  withColumnValueFalseFilter
} from "../../game-engine/board/board.helpers";
import {
  BoardDifference,
  BoardDifferences
} from "../../game-engine/board/board.model";
import { GameRule, GameRules } from "../../game-engine/rule/rule.model";
import { GameState, GameStatus } from "../../game-engine/state/state.model";

const MAX_MATCHES = 3;
export const MAXIMUM_OF_MATCHES_EXCEEDED_ERROR = "MAXIMUM_MATCHES_EXCEEDED";
export const NOTHING_CHANGED_ERROR = "NOTHING_CHANGED_ERROR";

export const isMaximumOfMatchesExceededRule: GameRule = (
  newState: GameState,
  actualState: GameState,
  boardDifferences: BoardDifferences
) => (state: GameState) => {
  if (state.status === GameStatus.Errornous) return state;

  if (boardDifferences.length > MAX_MATCHES) {
    const errornousState = {
      ...cloneDeep(actualState),
      errorMessage: MAXIMUM_OF_MATCHES_EXCEEDED_ERROR,
      status: GameStatus.Errornous
    };

    boardDifferences
      .map((difference: BoardDifference) => difference.path)
      .forEach((path: string[]) => {
        const column = path.reduce(
          (currentProperty, path) => currentProperty[path],
          errornousState.board
        );
        column.errorMessage = MAXIMUM_OF_MATCHES_EXCEEDED_ERROR;
      });
    return errornousState;
  }
  return state;
};

export const preventBoardHasNoChangesRule: GameRule = (
  newState: GameState,
  actualState: GameState,
  boardDifferences: BoardDifferences
) => (state: GameState) => {
  if (state.status === GameStatus.Errornous) return state;

  if (boardDifferences.length === 0) {
    let errornousState = cloneDeep(actualState);
    errornousState = {
      ...errornousState,
      status: GameStatus.Errornous,
      errorMessage: NOTHING_CHANGED_ERROR,
      board: {
        ...errornousState.board
      }
    };
    return errornousState;
  }
  return state;
};

export const isGameOverRule: GameRule = (
  newState: GameState,
  actualState: GameState,
  boardDifferences: BoardDifferences
) => (state: GameState) => {
  if (state.status === GameStatus.Errornous) return state;

  if (countColumnsOf(newState.board, withColumnValueFalseFilter) === 0) {
    return { ...state, status: GameStatus.GameOver };
  }

  return state;
};

export const NIM_GAME_RULES: GameRules = [
  preventBoardHasNoChangesRule,
  isMaximumOfMatchesExceededRule,
  isGameOverRule
];
