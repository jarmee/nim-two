import { cloneDeep } from 'lodash';
import { GameState } from '../state/state.model';
import { AiRule, AiRules } from './bot.model';

export const calculateState = (rules: AiRules) => (state: GameState) => {
  if (!rules || !rules.length) {
    return state;
  }

  return rules.reduce((reducedState: GameState, rule: AiRule) => rule(reducedState)(reducedState), cloneDeep(state));
};
