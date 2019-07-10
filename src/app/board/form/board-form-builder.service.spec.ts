import { TestBed } from "@angular/core/testing";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import * as faker from "faker";
import { BoardBuilder } from "src/app/shared/board/board.builder";
import { Column } from "src/app/shared/board/board.model";
import { BoardFormBuilderService } from "./board-form-builder.service";

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
    it("should return a form group", () => {
      const actual = service.initial();

      expect(actual instanceof FormGroup).toBe(true);
    });
  });

  describe("of", () => {
    const board = BoardBuilder.create()
      .addRowWithColumns(
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      )
      .build();

    it("should return a form group", () => {
      const actual: FormGroup = service.of(board);

      expect(actual instanceof FormGroup).toBe(true);
    });

    it("should create a form control for each row", () => {
      const actual = service.of(board);

      expect(Object.keys(actual.controls).length).toBe(
        Object.keys(board).length
      );
    });

    it("should create a form control for each column", () => {
      const rowKeys = Object.keys(board);
      const [randomRowKey, randomColumns] = rowKeys.map(rowKey => [
        rowKey,
        board[rowKey]
      ])[faker.random.number({ min: 0, max: rowKeys.length - 1 })];
      const actual = service.of(board);

      expect(
        Object.keys((actual.get(randomRowKey) as FormGroup).controls).length
      ).toBe(Object.keys(randomColumns).length);
    });

    it("should return a form group which value is equal ", () => {
      const boardWithoutErrorMessages = { ...board };
      Object.keys(boardWithoutErrorMessages).forEach((rowKey: string) =>
        Object.values(boardWithoutErrorMessages[rowKey]).forEach(
          (column: Column) => delete column.errorMessage
        )
      );
      const actual = service.of(board);

      expect(actual.value).toEqual(boardWithoutErrorMessages);
    });
  });
});
