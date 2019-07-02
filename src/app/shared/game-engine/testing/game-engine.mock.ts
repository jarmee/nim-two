import * as faker from "faker";
import * as Factory from "factory.ts";
import { GameState } from "../game-engine.model";

export const gameStateFactory = Factory.Sync.makeFactory<GameState>({
  amount: faker.random.number()
});
