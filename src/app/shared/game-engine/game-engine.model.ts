import { InjectionToken } from "@angular/core";
import { Board, BoardDifferences } from "../board/board.model";
import { GameEngineStore } from "./game-engine.store";

export enum GameStatus {
  Fresh = "Fresh",
  Errornous = "Errornous",
  GameOverPlayerOne = "Game Over Player One",
  GameOverPlayerTwo = "Game Over Player Two",
  HumanPlay = "Human Play",
  AiPlay = "Ai Play"
}

export interface GameState {
  status?: GameStatus;
  board: Board;
}

export type GameRule = (
  newBoard: GameState,
  currentBoard: GameState,
  differences: BoardDifferences
) => (calculatedGameState: Partial<GameState>) => GameState;

export type GameRules = GameRule[];

export type AiRule = (
  state: GameState
) => (calculatedGameState: Partial<GameState>) => GameState;

export type AiRules = AiRule[];

export const GAME_STATE_STORE: InjectionToken<GameState> = new InjectionToken<
  GameEngineStore
>("GAME_STATE_STORE");

export const GAME_RULES: InjectionToken<GameRules> = new InjectionToken<
  GameRules
>("GAME_RULES");

export const GAME_AI_RULES: InjectionToken<AiRules> = new InjectionToken<
  AiRules
>("GAME_AI_RULES");
