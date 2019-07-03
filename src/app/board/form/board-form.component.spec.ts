import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardFormComponent, hasChanged } from "./board-form.component";
import { BoardFormBuilderService } from "./board-form-builder.service";
import { ReactiveFormsModule } from "@angular/forms";
import { boardFactory } from "src/app/shared/board/testing/board.mock";
import { SimpleChange, SimpleChanges } from "@angular/core";
import { Board } from "src/app/shared/board/board.model";
import { Board } from "src/app/shared/board/board.model";

describe("BoardFormComponent", () => {
  const board: Board = boardFactory();
  let component: BoardFormComponent;
  let fixture: ComponentFixture<BoardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardFormComponent],
      imports: [ReactiveFormsModule],
      providers: [BoardFormBuilderService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardFormComponent);
    component = fixture.componentInstance;
    component.board = board;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match the snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });

  describe("hasChanged", () => {
    it("should return false if both values are null", () => {
      expect(hasChanged(null, null)).toBe(false);
    });

    it("should return true if the current board is null and the previous board has a value", () => {
      expect(hasChanged(null, {})).toBe(true);
    });

    it("should return true if the current board is not null and the previous board is null", () => {
      expect(hasChanged({}, null)).toBe(true);
    });

    it("should return true if the row count of both boards is not equal", () => {
      const currentBoard = {
        0: {},
        1: {},
        2: {}
      };
      const previousBoard = {
        0: {}
      };
      expect(hasChanged(currentBoard, previousBoard)).toBe(true);
    });

    it("should return true if the row count is equal but one colum count of one row differs", () => {
      const currentBoard = {
        0: {
          0: false
        },
        1: {
          0: false,
          2: true
        },
        2: {
          0: false
        }
      };
      const previousBoard = {
        0: {
          0: false
        },
        1: {
          0: false
        },
        2: {
          0: false
        }
      };
      expect(hasChanged(currentBoard, previousBoard)).toBe(true);
    });
  });

  describe("ngOnChanges", () => {
    const changes: SimpleChanges = {
      board: new SimpleChange(null, board, true)
    };
    beforeEach(() => {
      component.board = null;
    });

    it("should set the board property", () => {
      component.ngOnChanges(changes);

      expect(component.board).toBe(board);
    });

    it("should set the form group", () => {
      component.ngOnChanges(changes);

      expect(Object.keys(component.formGroup.controls).length).toBe(
        Object.keys(board).length
      );
    });
  });
});
