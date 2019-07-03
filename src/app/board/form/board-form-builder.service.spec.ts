import { TestBed } from "@angular/core/testing";

import { BoardFormBuilderService } from "./board-form-builder.service";
import { BoardModule } from "../board.module";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";

describe("BoardFormBuilderService", () => {
  let service: BoardFormBuilderService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [BoardFormBuilderService],
      imports: [ReactiveFormsModule]
    })
  );

  beforeEach(() => {
    service = TestBed.get(BoardFormBuilderService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("initial", () => {
    it("should return the initial form group", () => {
      expect(service.initial() instanceof FormGroup).toBe(true);
    });
  });
});
