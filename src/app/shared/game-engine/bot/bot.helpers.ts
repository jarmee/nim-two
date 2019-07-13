import { cloneDeep } from "lodash";
import { GameState } from "../game-engine.model";
import { AiRule, AiRules } from "./bot.model";

export const calculateState = (rules: AiRules) => (state: GameState) => {
  if (!rules || !rules.length) return state;

  return rules.reduce(
    (calculateState: GameState, rule: AiRule) => rule(state)(calculateState),
    cloneDeep(state)
  );
};
