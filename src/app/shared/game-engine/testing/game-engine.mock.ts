import * as faker from "faker";
import * as Factory from "factory.ts";
import { GameState } from "../game-engine.model";
import { boardFactory } from "../../board/testing/board.mock";

export const gameStateFactory = Factory.Sync.makeFactory<GameState>({
  board: boardFactory()
});
