import { TestBed } from "@angular/core/testing";
import { NIM_BOARD } from "../../rules/nim/nim.board";
import { GAME_STATE_STORE } from "../game-engine.model";
import { GameEngineService } from "../game-engine.service";
import { GameEngineStore } from "../game-engine.store";
import { RuleService } from "../rule/rule.service";
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
          provide: GAME_STATE_STORE,
          useFactory: () => new GameEngineStore(NIM_BOARD)
        },
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(PLAYERS)
        },
        RuleService,
        GameEngineService
      ]
    })
  );

  it("should be created", () => {
    const service: BotService = TestBed.get(BotService);
    expect(service).toBeTruthy();
  });
});
