import { BoardDifference, BoardDifferences } from "../../board/board.model";
import { GameRule, GameRules, GameState, GameStatus } from "../../game-engine/game-engine.model";
import { calculateAmount } from "../../game-engine/game-engine.service";

const MAX_MATCHES = 3;
const MAXIMUM_OF_MATCHES_EXCEEDED_ERROR = "Maximum Matches Exceeded";

export const isMaximumOfMatchesExceeded: GameRule = (
  newState: GameState,
  actualState: GameState,
  boardDifferences: BoardDifferences
) => (state: GameState) => {
  if (state.status === GameStatus.Errornous) return state;
  if (boardDifferences.length > MAX_MATCHES) {
    const errornousState = {
      ...actualState,
      status: GameStatus.Errornous,
      board: {
        ...actualState.board
      }
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

export const isGameOver: GameRule = (
  newState: GameState,
  actualState: GameState,
  boardDifferences: BoardDifferences
) => (state: GameState) => {
  if (state.status === GameStatus.Errornous) return state;
  if (calculateAmount(newState.board) === 0) {
    const player = boardDifferences[0].newColumn.player;
    const status =
      player === "🤖" ? GameStatus.GameOverPlayerTwo : GameStatus.GameOverPlayerOne;
    return { ...state, status };
  }

  return state;
};

export const NIM_RULES: GameRules = [isMaximumOfMatchesExceeded, isGameOver];
