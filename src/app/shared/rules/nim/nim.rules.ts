import {
  Board,
  BoardDifference,
  BoardDifferences
} from "../../board/board.model";
import { GameRule, GameRules } from "../../game-engine/game-engine.model";

const MAX_MATCHES = 3;

export const isMaximumOfMatchesExceeded: GameRule = (
  newBoard: Board,
  currentBoard: Board,
  boardDifferences: BoardDifferences
) => (board: Board) => {
  if (boardDifferences.length > MAX_MATCHES) {
    const errornousBoard = { ...currentBoard };
    boardDifferences
      .map((difference: BoardDifference) => difference.path)
      .forEach((path: string[]) => {
        const column = path.reduce(
          (currentProperty, path) => currentProperty[path],
          errornousBoard
        );
        column.errorMessage = "Error";
      });
    return errornousBoard;
  }
  return newBoard;
};

export const NIM_RULES: GameRules = [isMaximumOfMatchesExceeded];
