import { TestBed } from "@angular/core/testing";
import { NIM_BOARD } from "../../games/nim/nim.board";
import { STATE_STORE } from "./state.model";
import { StateService } from "./state.service";
import { GameStateStore } from "./state.store";

describe("StateService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        StateService,
        {
          provide: STATE_STORE,
          useFactory: () => new GameStateStore(NIM_BOARD)
        }
      ]
    })
  );

  it("should be created", () => {
    const service: StateService = TestBed.get(StateService);
    expect(service).toBeTruthy();
  });
});
