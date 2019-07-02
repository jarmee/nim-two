import { TestBed } from "@angular/core/testing";

import { GameEngineService } from "./game-engine.service";
import { GameState, GAME_STATE_STORE } from "./game-engine.model";
import { gameStateFactory } from "./testing/game-engine.mock";
import { GameEngineStore } from "./game-engine.store";

describe("GameEngineService", () => {
  const initialGameState: GameState = gameStateFactory.build();

  let service: GameEngineService;
  let store: GameEngineStore;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        GameEngineService,
        {
          provide: GAME_STATE_STORE,
          useFactory: () => new GameEngineStore(initialGameState)
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(GameEngineService);
    store = TestBed.get(GAME_STATE_STORE);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("executePlay", () => {
    beforeEach(() => {
      store.next = jest.fn();
    });

    it("should call the next method of the store with the decreased amount", () => {
      const amount = store.snapshot.amount;
      const decreaseAmountByOne = 1;
      const expectedAmount = amount - decreaseAmountByOne;

      service.executePlay(decreaseAmountByOne);

      expect(store.next).toHaveBeenCalledWith({
        amount: expectedAmount
      });
    });

    afterEach(() => {
      (store.next as jest.Mock).mockClear();
    });
  });

  describe("amount$", () => {
    it("should emit the current amount", done => {
      service.amount$.subscribe((actualAmount: number) => {
        expect(actualAmount).toBe(store.snapshot.amount);
        done();
      });
    });
  });
});
