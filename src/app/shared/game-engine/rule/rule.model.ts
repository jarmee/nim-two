import { InjectionToken } from "@angular/core";
import { BoardDifferences } from "../board/board.model";
import { GameState } from "../state/state.model";

export type GameRule = (
  newBoard: GameState,
  currentBoard: GameState,
  differences: BoardDifferences
) => (calculatedGameState: Partial<GameState>) => GameState;

export type GameRules = GameRule[];

export const GAME_RULES: InjectionToken<GameRules> = new InjectionToken<
  GameRules
>("GAME_RULES");
