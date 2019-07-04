import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardFormComponent, hasChanged } from "./board-form.component";
import { BoardFormBuilderService } from "./board-form-builder.service";
import { ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";
import { boardFactory } from "src/app/shared/board/testing/board.mock";
import { SimpleChange, SimpleChanges } from "@angular/core";
import { Board } from "src/app/shared/board/board.model";
import { By } from "@angular/platform-browser";
import { MatchControlComponent } from "./match-control/match-control.component";
import { BoardBuilder } from "src/app/shared/board/board.builder";
import * as faker from "faker";

describe("BoardFormComponent", () => {
  const board: Board = boardFactory();
  let component: BoardFormComponent;
  let fixture: ComponentFixture<BoardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardFormComponent, MatchControlComponent],
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
      const currentBoard = BoardBuilder.create()
        .addRowWithColumns(false)
        .addRowWithColumns(false)
        .addRowWithColumns(false)
        .build();
      const previousBoard = BoardBuilder.create()
        .addRowWithColumns(false)
        .build();
      expect(hasChanged(currentBoard, previousBoard)).toBe(true);
    });

    it("should return true if the row count is equal but one colum count of one row differs", () => {
      const currentBoard = BoardBuilder.create()
        .addRowWithColumns(true, false)
        .addRowWithColumns(false)
        .addRowWithColumns(false, true)
        .build();
      const previousBoard = BoardBuilder.create()
        .addRowWithColumns(true, false)
        .addRowWithColumns(false, false)
        .addRowWithColumns(false, true)
        .build();
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

  describe("formGroupControlNames", () => {
    it("should return the names of all form groups", () => {
      component.formGroup = new FormGroup({ 0: new FormGroup({}) });

      expect(component.formGroupControlNames).toEqual(["0"]);
    });
  });

  describe("columnFormGroupControlNamesOf", () => {
    it("should return the names of all form controls of a form group", () => {
      component.formGroup = new FormGroup({
        "0": new FormGroup({
          "0": new FormControl(false),
          "1": new FormControl(false),
          "2": new FormControl(false),
          "3": new FormControl(false),
          "4": new FormControl(false)
        })
      });

      expect(component.columnFormGroupControlNamesOf("0")).toEqual([
        "0",
        "1",
        "2",
        "3",
        "4"
      ]);
    });
  });

  describe("playerName", () => {
    it("should return the playerName property", () => {
      const player = faker.name.firstName();
      component.formGroup = new FormGroup({
        0: new FormGroup({
          0: new FormGroup({
            value: new FormControl(false),
            player: new FormControl(player)
          })
        })
      });

      expect(component.playerName("0", "0")).toBe(player);
    });
  });

  describe("hasControls", () => {
    it("should return false if no controls are available", () => {
      component.formGroup = new FormGroup({});

      expect(component.hasControls).toBe(false);
    });

    it("should return true if at least one control is available", () => {
      component.formGroup = new FormGroup({ 0: new FormGroup({}) });

      expect(component.hasControls).toBe(true);
    });
  });

  describe("onExecutePlay", () => {
    it("should call the emit method of the executePlay event handler", () => {
      component.executePlay.emit = jest.fn();

      component.onExecutePlay();

      expect(component.executePlay.emit).toHaveBeenCalledWith(
        component.formGroup.value
      );
    });

    it("should call the emit method of the executePlay event handler", () => {
      component.board = board;
      fixture.detectChanges();

      component.executePlay.emit = jest.fn();

      const buttonElement = fixture.debugElement.query(
        By.css("[data-test-id='execute-play-button']")
      );
      buttonElement.triggerEventHandler("click", {});

      expect(component.executePlay.emit).toHaveBeenCalledWith(
        component.formGroup.value
      );
    });
  });
});
