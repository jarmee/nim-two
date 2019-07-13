import { TestBed } from "@angular/core/testing";
import { GameEngineFacade } from ".";
import { NIM_BOARD } from "../games/nim/nim.board";
import { BoardBuilder } from "./board/board.builder";
import { Board } from "./board/board.model";
import { BotService } from "./bot/bot.service";
import { RuleService } from "./rule/rule.service";
import { GameStatus, STATE_STORE } from "./state/state.model";
import { StateService } from "./state/state.service";
import { GameStateStore } from "./state/state.store";
import {
  Player,
  playerFactory,
  Players,
  PlayerType,
  TURN_STATE_STORE
} from "./turn/turn.model";
import { TurnService } from "./turn/turn.service";
import { TurnStore } from "./turn/turn.store";

describe("GameEngineFacade", () => {
  const player1: Player = playerFactory("Player 1", PlayerType.Human);
  const player2: Player = playerFactory("Player 2", PlayerType.Artificial);
  const players: Players = [player1, player2];

  let service: GameEngineFacade;
  let store: GameStateStore;
  let stateService: StateService;
  let ruleService: RuleService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        GameEngineFacade,
        {
          provide: STATE_STORE,
          useFactory: () => new GameStateStore(NIM_BOARD)
        },
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(players)
        },
        TurnService,
        RuleService,
        StateService,
        BotService
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(GameEngineFacade);
    store = TestBed.get(STATE_STORE);
    stateService = TestBed.get(StateService);
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
      stateService.resetState = jest.fn();
    });

    it("should call the resetState method of the stateService", () => {
      service.reset();

      expect(stateService.resetState).toHaveBeenCalled();
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
