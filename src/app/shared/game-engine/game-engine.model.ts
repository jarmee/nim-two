import { InjectionToken } from "@angular/core";
import { Board, BoardDifferences } from "../board/board.model";
import { GameEngineStore } from "./game-engine.store";

export interface GameState {
  board: Board;
}

export const GAME_STATE_STORE: InjectionToken<GameState> = new InjectionToken<
  GameEngineStore
>("GAME_STATE_STORE");

export const GAME_RULES: InjectionToken<GameRules> = new InjectionToken<
  GameRules
>("GAME_RULES");

export type GameRule = (
  newBoard: Board,
  currentBoard: Board,
  differences: BoardDifferences
) => (board: Board) => Board;

export type GameRules = GameRule[];
