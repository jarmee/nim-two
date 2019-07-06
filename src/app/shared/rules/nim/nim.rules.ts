import { Board, BoardDifferences } from "../../board/board.model";
import { GameRule, GameRules } from "../../game-engine/game-engine.model";

const MAX_MATCHES = 3;

export const isMaximumOfMatchesExceeded: GameRule = (
  newBoard: Board,
  currentBoard: Board,
  boardDifferences: BoardDifferences
) => (board: Board) => {
  if (boardDifferences.length > MAX_MATCHES) {
    return { ...currentBoard };
  }
  return newBoard;
};

export const NIM_RULES: GameRules = [isMaximumOfMatchesExceeded];
