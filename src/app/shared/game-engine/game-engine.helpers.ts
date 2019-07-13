import { cloneDeep } from "lodash";
import { areColumnsDifferentByValue as areColumnsDifferentByValue, exchangeColumnsOf, findColumnOf } from "../board/board.helpers";
import { Board, BoardDifferences, Column, Path } from "../board/board.model";
import { AiRule, AiRules, GameRule, GameRules, GameState } from "./game-engine.model";
import { Player } from "./turn/turn.model";

export const applyRules = (rules: GameRules) => (
  newState: GameState,
  actualState: GameState,
  boardDifferences: BoardDifferences
) => {
  if (!rules || !rules.length) return newState;

  return rules.reduce(
    (state: GameState, rule: GameRule) =>
      rule(newState, actualState, boardDifferences)(state),
    cloneDeep(newState)
  );
};

export const calculateState = (rules: AiRules) => (state: GameState) => {
  if (!rules || !rules.length) return state;

  return rules.reduce(
    (calculateState: GameState, rule: AiRule) => rule(state)(calculateState),
    cloneDeep(state)
  );
};

function setPlayerWhereColumnIsDifferent(
  compareToBoard: Board,
  toPlayer: Player
): (column: Column, path: Path) => Column {
  return (column: Column, path: Path) => {
    if (
      areColumnsDifferentByValue(column, findColumnOf(compareToBoard, path))
    ) {
      return {
        ...column,
        player: toPlayer.name
      };
    }
    return column;
  };
}

export function setPlayerForBoardIn(
  state: GameState,
  onlyToTheChangedColumnsOfState: GameState,
  toPlayer: Player
): GameState {
  if (!state) return null;

  const compareToBoard = onlyToTheChangedColumnsOfState
    ? onlyToTheChangedColumnsOfState.board
    : null;
  return {
    ...state,
    board: exchangeColumnsOf(
      state.board,
      setPlayerWhereColumnIsDifferent(compareToBoard, toPlayer)
    )
  };
}
