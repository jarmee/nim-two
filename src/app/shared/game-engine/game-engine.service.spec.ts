import { TestBed } from "@angular/core/testing";
import { BoardBuilder } from "./board/board.builder";
import { Board } from "./board/board.model";
import { NIM_BOARD } from "../games/nim/nim.board";
import { GameEngineService } from "./game-engine.service";
import { RuleService } from "./rule/rule.service";
import { GameStateStore } from "./state/state.store";
import { GameStatus, STATE_STORE } from "./state/state.model";
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
  const player1: Player = playerFactory("Player 1", PlayerType.Human);
  const player2: Player = playerFactory("Player 2", PlayerType.Artificial);
  const players: Players = [player1, player2];

  let service: GameEngineService;
  let store: GameStateStore;
  let turnService: TurnService;
  let ruleService: RuleService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        GameEngineService,
        {
          provide: STATE_STORE,
          useFactory: () => new GameStateStore(NIM_BOARD)
        },
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(players)
        },
        TurnService,
        RuleService
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(GameEngineService);
    store = TestBed.get(STATE_STORE);
    turnService = TestBed.get(TurnService);
    ruleService = TestBed.get(RuleService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("executePlay", () => {
    beforeEach(() => {
      ruleService.applyRules = jest.fn();
    });

    it("should call the applyRules method of the ruleService", () => {
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

      expect(ruleService.applyRules).toHaveBeenCalledWith({
        board: expectedBoard
      });
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
});
