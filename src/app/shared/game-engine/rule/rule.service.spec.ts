import { TestBed } from "@angular/core/testing";
import { NIM_BOARD } from "../../rules/nim/nim.board";
import { GAME_STATE_STORE } from "../game-engine.model";
import { GameEngineStore } from "../game-engine.store";
import {
  playerFactory,
  PlayerType,
  TURN_STATE_STORE
} from "../turn/turn.model";
import { TurnService } from "../turn/turn.service";
import { TurnStore } from "../turn/turn.store";
import { RuleService } from "./rule.service";

describe("RuleService", () => {
  const PLAYERS = [
    playerFactory("😎", PlayerType.Human),
    playerFactory("🤖", PlayerType.Artificial)
  ];
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        RuleService,
        {
          provide: GAME_STATE_STORE,
          useFactory: () => new GameEngineStore(NIM_BOARD)
        },
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(PLAYERS)
        },
        TurnService
      ]
    })
  );

  it("should be created", () => {
    const service: RuleService = TestBed.get(RuleService);
    expect(service).toBeTruthy();
  });
});
