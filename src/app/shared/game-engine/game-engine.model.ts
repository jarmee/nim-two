import { InjectionToken } from "@angular/core";
import { Board, BoardDifferences } from "../board/board.model";
import { GameEngineStore } from "./game-engine.store";

export enum GameStatus {
  Fresh = "Fresh",
  InProgress = "In Progress",
  Errornous = "Errornous",
  GameOver = "Game Over"
}

export interface GameState {
  status?: GameStatus;
  board: Board;
}

export type GameRule = (
  newBoard: GameState,
  currentBoard: GameState,
  differences: BoardDifferences
) => (board: Partial<GameState>) => GameState;

export type GameRules = GameRule[];

export const GAME_STATE_STORE: InjectionToken<GameState> = new InjectionToken<
  GameEngineStore
>("GAME_STATE_STORE");

export const GAME_RULES: InjectionToken<GameRules> = new InjectionToken<
  GameRules
>("GAME_RULES");

export const GAME_AI_RULES: InjectionToken<GameRules> = new InjectionToken<
  GameRules
>("GAME_AI_RULES");
