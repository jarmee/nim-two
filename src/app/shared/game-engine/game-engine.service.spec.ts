import { TestBed } from "@angular/core/testing";
import { BoardBuilder } from "../board/board.builder";
import { Board } from "../board/board.model";
import { GameState, GameStatus, GAME_STATE_STORE } from "./game-engine.model";
import { GameEngineService } from "./game-engine.service";
import { GameEngineStore } from "./game-engine.store";
import { gameStateFactory } from "./testing/game-engine.mock";
import {
  Player,
  playerFactory,
  Players,
  PlayerType,
  TURN_STATE_STORE
} from "./turn/turn.model";
import { TurnService } from "./turn/turn.service";
import { TurnStore } from "./turn/turn.store";

describe("GameEngineService", () => {
  const initialGameState: GameState = gameStateFactory.build();
  const player1: Player = playerFactory("Player 1", PlayerType.Human);
  const player2: Player = playerFactory("Player 2", PlayerType.Artificial);
  const players: Players = [player1, player2];

  let service: GameEngineService;
  let store: GameEngineStore;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        GameEngineService,
        {
          provide: GAME_STATE_STORE,
          useFactory: () => new GameEngineStore(initialGameState)
        },
        TurnService,
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(players)
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

    it("should call the next method of the store", () => {
      const expectedBoard = BoardBuilder.create()
        .addRowWithColumns(
          false,
          false,
          false,
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
        .build();

      service.executePlay(expectedBoard);

      expect(store.next).toHaveBeenCalledWith({
        status: GameStatus.HumanPlay,
        board: expectedBoard
      });
    });

    afterEach(() => {
      (store.next as jest.Mock).mockClear();
    });
  });

  describe("reset", () => {
    beforeEach(() => {
      store.reset = jest.fn();
    });

    it("should call the reset method of the store", () => {
      service.reset();

      expect(store.reset).toHaveBeenCalled();
    });

    afterEach(() => {
      (store.reset as jest.Mock).mockClear();
    });
  });

  describe("amount$", () => {
    it("should emit the current amount", done => {
      service.amount$.subscribe((actualAmount: number) => {
        expect(actualAmount).toBe(13);
        done();
      });
    });
  });

  describe("board$", () => {
    it("should emit the current board", done => {
      service.board$.subscribe((actualBoard: Board) => {
        expect(actualBoard).toEqual(store.snapshot.board);
        done();
      });
    });
  });

  describe("status$", () => {
    it("should emit the current game status", done => {
      service.status$.subscribe((actualStatus: GameStatus) => {
        expect(actualStatus).toBe(store.snapshot.status);
        done();
      });
    });
  });

  describe("gameLoop$", () => {
    //TODO: Add missing tests
  });

  describe("aiLoop$", () => {
    //TODO: Add missing tests
  });
});
