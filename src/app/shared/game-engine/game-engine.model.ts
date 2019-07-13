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

export const initialGameState: GameState = {
  status: GameStatus.Fresh,
  board: null
};

export const GAME_STATE_STORE: InjectionToken<GameState> = new InjectionToken<
  GameEngineStore
>("GAME_STATE_STORE");
