import { TestBed } from "@angular/core/testing";
import { NIM_BOARD } from "../../rules/nim/nim.board";
import { GameStateStore } from "../state/state.store";
import { STATE_STORE } from "../state/state.model";
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
          provide: STATE_STORE,
          useFactory: () => new GameStateStore(NIM_BOARD)
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
