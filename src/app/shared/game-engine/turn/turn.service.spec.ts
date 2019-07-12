import { TestBed } from "@angular/core/testing";
import {
  playerFactory,
  Players,
  PlayerType,
  TURN_STATE_STORE
} from "./turn.model";
import { TurnService } from "./turn.service";
import { TurnStore } from "./turn.store";

describe("TurnServiceService", () => {
  const player1 = playerFactory("Player 1", PlayerType.Human);
  const player2 = playerFactory("Player 2", PlayerType.Artificial);
  let service: TurnService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        TurnService,
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore([player1, player2])
        }
      ]
    })
  );

  it("should be created", () => {
    service = TestBed.get(TurnService);
    expect(service).toBeTruthy();
  });

  describe("players$", () => {
    it("should return the players", done => {
      service.players$.subscribe((players: Players) => {
        expect(players).toEqual([player1, player2]);
        done();
      });
    });
  });
});
