import { TestBed } from "@angular/core/testing";
import { playerFactory, PlayerType, TURN_STATE_STORE } from "./turn.model";
import { TurnService } from "./turn.service";
import { TurnStore } from "./turn.store";

describe("TurnServiceService", () => {
  const player1 = playerFactory("Player 1", PlayerType.Human);
  const player2 = playerFactory("Player 2", PlayerType.Artificial);

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
    const service: TurnService = TestBed.get(TurnService);
    expect(service).toBeTruthy();
  });
});
