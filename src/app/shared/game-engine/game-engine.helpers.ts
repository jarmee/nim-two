import { cloneDeep } from "lodash";
import { BoardDifferences } from "../board/board.model";
import {
  AiRule,
  AiRules,
  GameRule,
  GameRules,
  GameState
} from "./game-engine.model";

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
