import { Column, Columns } from "../../board/board.model";
import {
  AiRule,
  AiRules,
  GameState
} from "../../game-engine/game-engine.model";

export const calculatePlay: AiRule = (state: GameState) => {
  return (calculatedState: GameState) => {
    let matchesToPick = Math.round(Math.random() * 3) || 1;
    Object.values(calculatedState.board).map((columns: Columns) =>
      Object.values(columns)
        .filter((column: Column) => !column.value)
        .forEach((column: Column) => {
          if (matchesToPick > 0) {
            column.value = true;
            column.player = "🤖";
            matchesToPick--;
          }
        })
    );
    return calculatedState;
  };
};

export const NIM_KI_RULES: AiRules = [calculatePlay];
