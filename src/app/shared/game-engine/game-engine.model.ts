import { InjectionToken } from "@angular/core";
import { GameEngineStore } from "./game-engine.store";

export interface GameState {
  amount: number;
}

export const GAME_STATE_STORE: InjectionToken<GameState> = new InjectionToken<
  GameEngineStore
>("GAME_STATE_STORE");
