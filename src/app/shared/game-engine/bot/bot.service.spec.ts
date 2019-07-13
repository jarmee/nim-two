import { TestBed } from "@angular/core/testing";
import { NIM_BOARD } from "../../games/nim/nim.board";
import { RuleService } from "../rule/rule.service";
import { STATE_STORE } from "../state/state.model";
import { StateService } from "../state/state.service";
import { GameStateStore } from "../state/state.store";
import {
  playerFactory,
  PlayerType,
  TURN_STATE_STORE
} from "../turn/turn.model";
import { TurnService } from "../turn/turn.service";
import { TurnStore } from "../turn/turn.store";
import { BotService } from "./bot.service";

describe("BotService", () => {
  const PLAYERS = [
    playerFactory("😎", PlayerType.Human),
    playerFactory("🤖", PlayerType.Artificial)
  ];
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        BotService,
        TurnService,
        {
          provide: STATE_STORE,
          useFactory: () => new GameStateStore(NIM_BOARD)
        },
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(PLAYERS)
        },
        RuleService,
        StateService
      ]
    })
  );

  it("should be created", () => {
    const service: BotService = TestBed.get(BotService);
    expect(service).toBeTruthy();
  });
});
