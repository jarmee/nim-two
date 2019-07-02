import { GameState } from "./game-engine.model";
import { gameStateFactory } from "./testing/game-engine.mock";
import { GameEngineStore } from "./game-engine.store";
import * as faker from "faker";
import { skip } from "rxjs/operators";

describe("GameEngineStore", () => {
  const initialGameState: GameState = gameStateFactory.build();
  let store: GameEngineStore;

  beforeEach(() => {
    store = new GameEngineStore(initialGameState);
  });

  describe("Instantiation", () => {
    it("should set the snapshot", () => {
      expect(store.snapshot).toEqual(initialGameState);
    });
  });

  describe("next", () => {
    it("should change the current state", done => {
      const updatedState = gameStateFactory.build({
        amount: faker.random.number()
      });

      store.pipe(skip(1)).subscribe((actualState: GameState) => {
        expect(actualState).toEqual(updatedState);
        done();
      });

      store.next(updatedState);

      expect(store.snapshot).toEqual(updatedState);
    });
  });
});
