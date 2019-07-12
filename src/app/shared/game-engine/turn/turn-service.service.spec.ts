import { TestBed } from "@angular/core/testing";
import { TurnServiceService } from "./turn-service.service";

describe("TurnServiceService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TurnServiceService]
    })
  );

  it("should be created", () => {
    const service: TurnServiceService = TestBed.get(TurnServiceService);
    expect(service).toBeTruthy();
  });
});
