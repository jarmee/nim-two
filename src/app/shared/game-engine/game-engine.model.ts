import { InjectionToken } from "@angular/core";
import { GameEngineStore } from "./game-engine.store";
import { Board } from "../board/board.model";

export interface GameState {
  amount: number;
  board: Board;
}

export const GAME_STATE_STORE: InjectionToken<GameState> = new InjectionToken<
  GameEngineStore
>("GAME_STATE_STORE");
