import { InjectionToken } from "@angular/core";
import { GameState } from "../game-engine.model";

export type AiRule = (
  state: GameState
) => (calculatedGameState: Partial<GameState>) => GameState;

export type AiRules = AiRule[];

export const GAME_AI_RULES: InjectionToken<AiRules> = new InjectionToken<
  AiRules
>("GAME_AI_RULES");
