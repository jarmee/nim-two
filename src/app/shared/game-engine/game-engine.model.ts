import { InjectionToken } from "@angular/core";
import { Board } from "../board/board.model";
import { GameEngineStore } from "./game-engine.store";

export interface GameState {
  board: Board;
}

export const GAME_STATE_STORE: InjectionToken<GameState> = new InjectionToken<
  GameEngineStore
>("GAME_STATE_STORE");
