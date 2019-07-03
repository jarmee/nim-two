import { TestBed } from "@angular/core/testing";

import { BoardFormBuilderService } from "./board-form-builder.service";
import { BoardModule } from "../board.module";

describe("BoardFormBuilderService", () => {
  let service: BoardFormBuilderService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [BoardFormBuilderService]
    })
  );

  beforeEach(() => {
    service = TestBed.get(BoardFormBuilderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
