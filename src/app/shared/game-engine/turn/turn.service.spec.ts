import { TestBed } from "@angular/core/testing";
import { playerFactory, PLAYERS, PlayerType } from "./turn.model";
import { TurnService } from "./turn.service";

describe("TurnServiceService", () => {
  const player1 = playerFactory("Player 1", PlayerType.Human);
  const player2 = playerFactory("Player 2", PlayerType.Artificial);

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        TurnService,
        {
          provide: PLAYERS,
          useValue: [player1, player2]
        }
      ]
    })
  );

  it("should be created", () => {
    const service: TurnService = TestBed.get(TurnService);
    expect(service).toBeTruthy();
  });
});
