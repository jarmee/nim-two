import { skip } from "rxjs/operators";
import { BoardBuilder } from "../board/board.builder";
import { GameState, GameStatus } from "./game-engine.model";
import { GameEngineStore } from "./game-engine.store";
import { gameStateFactory } from "./testing/game-engine.mock";

describe("GameEngineStore", () => {
  const initialGameState: GameState = gameStateFactory.build();
  const updatedState = gameStateFactory
    .extend({
      board: BoardBuilder.create()
        .addRowWithColumns(
          true,
          true,
          true,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false
        )
        .build(),
      status: GameStatus.HumanPlay
    })
    .build();
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
      store.pipe(skip(1)).subscribe((actualState: GameState) => {
        expect(actualState).toEqual(updatedState);
        done();
      });

      store.next(updatedState);

      expect(store.snapshot).toEqual(updatedState);
    });
  });

  describe("reset", () => {
    it("should set the state to the initial state", done => {
      store.pipe(skip(1)).subscribe((actualState: GameState) => {
        expect(actualState).toEqual(initialGameState);
        done();
      });

      store.reset();
    });
  });
});
