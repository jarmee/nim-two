import * as Factory from "factory.ts";
import { boardFactory } from "../../board/testing/board.mock";
import { GameState } from "../game-engine.model";

export const gameStateFactory = Factory.Sync.makeFactory<GameState>({
  board: boardFactory()
});
