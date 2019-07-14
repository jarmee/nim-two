import { TestBed } from "@angular/core/testing";
import * as faker from "faker";
import { of } from "rxjs";
import { NIM_BOARD } from "../../games/nim/nim.board";
import { RuleService } from "../rule/rule.service";
import { GameState, GameStatus, STATE_STORE } from "../state/state.model";
import { StateService } from "../state/state.service";
import { GameStateStore } from "../state/state.store";
import { gameStateFactory } from "../testing/game-engine.mock";
import {
  Player,
  playerFactory,
  Players,
  PlayerType,
  TURN_STATE_STORE
} from "../turn/turn.model";
import { TurnService } from "../turn/turn.service";
import { TurnStore } from "../turn/turn.store";
import { GAME_MESSAGE_PRODUCER, MessageProducer } from "./message.model";
import { MessageService } from "./message.service";

describe("MessageService", () => {
  const player1: Player = playerFactory("Player 1", PlayerType.Human);
  const player2: Player = playerFactory("Player 2", PlayerType.Artificial);
  const players: Players = [player1, player2];
  const message = faker.random.word();
  const fakeMessageProducer: (expectedValue: string) => MessageProducer = (
    expectedValue: string
  ) => (status: GameStatus, player: Player) => expectedValue;

  const gameState: GameState = gameStateFactory.build();

  let service: MessageService;
  let ruleService: RuleService;
  let stateService: StateService;
  let turnService: TurnService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        MessageService,
        TurnService,
        {
          provide: RuleService,
          useValue: {
            rulesApplied$: of(gameState)
          }
        },
        StateService,
        {
          provide: STATE_STORE,
          useFactory: () => new GameStateStore(NIM_BOARD)
        },
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(players)
        },
        {
          provide: GAME_MESSAGE_PRODUCER,
          useValue: fakeMessageProducer(message)
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(MessageService);
    ruleService = TestBed.get(RuleService);
    stateService = TestBed.get(StateService);
    turnService = TestBed.get(TurnService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("messages$", () => {
    it("should emit a message", done => {
      turnService.selectedPlayer$ = of(player1);

      service.messages$.subscribe((actualMessage: string) => {
        expect(actualMessage).toBe(message);
        done();
      });
    });
  });
});
