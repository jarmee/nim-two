import {
  ChangeDetectionStrategy,
  SimpleChange,
  SimpleChanges
} from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import * as faker from "faker";
import { BoardBuilder } from "../../shared/board/board.builder";
import { Board, Column } from "../../shared/board/board.model";
import { BoardFormBuilderService } from "./board-form-builder.service";
import {
  andSetErrors,
  andSetPlayerIfCheckedTo,
  BoardFormComponent,
  hasChanged,
  patchValueOf,
  watchColumnValueChangesOf
} from "./board-form.component";
import { MatchControlComponent } from "./match-control/match-control.component";

describe("BoardFormComponent", () => {
  const board: Board = BoardBuilder.create()
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
  let component: BoardFormComponent;
  let fixture: ComponentFixture<BoardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardFormComponent, MatchControlComponent],
      imports: [ReactiveFormsModule],
      providers: [BoardFormBuilderService]
    }).compileComponents();
    TestBed.overrideComponent(BoardFormComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
    });
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

  describe("patchValueOf", () => {
    it("should call the patchValue method of the formGroup", () => {
      const fakeCallback = jest.fn();
      const value = {};
      const formGroup = new FormGroup({});
      formGroup.patchValue = jest.fn();

      patchValueOf<any>(formGroup, value, fakeCallback);

      expect(formGroup.patchValue).toHaveBeenCalledWith(value, {
        emitEvent: false
      });
    });

    it("should call the given callback", () => {
      const fakeCallback = jest.fn();
      const value = {};
      const formGroup = new FormGroup({});
      formGroup.patchValue = jest.fn();

      patchValueOf<any>(formGroup, value, fakeCallback);

      expect(fakeCallback).toHaveBeenCalledWith(formGroup, value);
    });
  });

  describe("andSetErrors", () => {
    it("should set the error", () => {
      const errorMessage = faker.random.words();
      const boardWithErrors: Board = {
        0: {
          0: {
            value: false,
            player: faker.name.firstName(),
            errorMessage
          }
        }
      };
      const formGroup = new FormGroup({
        0: new FormGroup({
          0: new FormGroup({
            value: new FormControl(false),
            player: new FormControl(null)
          })
        })
      });
      andSetErrors()(formGroup, boardWithErrors);

      expect(formGroup.hasError("errorMessage", ["0", "0"]));
      expect(formGroup.getError("errorMessage", ["0", "0"])).toEqual(
        errorMessage
      );
    });
  });

  describe("columnFormGroup", () => {
    it("should return the form group of the column", () => {
      const columnFormGroup: FormGroup = new FormGroup({
        value: new FormControl(false),
        player: new FormControl(null)
      });
      const formGroup: FormGroup = new FormGroup({
        0: new FormGroup({
          0: columnFormGroup
        })
      });
      component.formGroup = formGroup;

      const actualFormGroup = component.columnFormGroup("0", "0");

      expect(actualFormGroup).toBe(columnFormGroup);
    });
  });

  describe("isColumnErrornous", () => {
    it("should return true if the column form group is errornous", () => {
      const errorMessage = faker.random.words();
      const columnFormGroup: FormGroup = new FormGroup({
        value: new FormControl(false),
        player: new FormControl(null)
      });
      columnFormGroup.setErrors({
        errorMessage
      });
      const formGroup: FormGroup = new FormGroup({
        0: new FormGroup({
          0: columnFormGroup
        })
      });
      component.formGroup = formGroup;

      expect(component.isColumnErrornous("0", "0")).toBe(true);
    });

    it("should return false if the column form group is valid", () => {
      const columnFormGroup: FormGroup = new FormGroup({
        value: new FormControl(false),
        player: new FormControl(null)
      });
      const formGroup: FormGroup = new FormGroup({
        0: new FormGroup({
          0: columnFormGroup
        })
      });
      component.formGroup = formGroup;

      expect(component.isColumnErrornous("0", "0")).toBe(false);
    });

    xit("should display the error message", async(() => {
      const errorMessage = faker.random.words();
      component.board = BoardBuilder.create()
        .addRowWithColumns(false, false)
        .addRowWithColumns(false, false)
        .build();

      fixture.detectChanges();

      const errorElement = fixture.debugElement.query(
        By.css("[data-test-id='column-error']")
      );

      expect(errorElement).toBeTruthy();
      expect(errorElement.nativeElement.innerText).toBe(errorMessage);
    }));
  });

  describe("columnErrorMessage", () => {
    it("should return an error message if the form group is errornous", () => {
      const errorMessage = faker.random.words();
      const columnFormGroup: FormGroup = new FormGroup({
        value: new FormControl(false),
        player: new FormControl(null)
      });
      columnFormGroup.setErrors({
        errorMessage
      });
      const formGroup: FormGroup = new FormGroup({
        0: new FormGroup({
          0: columnFormGroup
        })
      });
      component.formGroup = formGroup;

      expect(component.columnErrorMessage("0", "0")).toBe(errorMessage);
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

    describe("UI Interaction", () => {
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

  describe("onReset", () => {
    it("should call the emit method of the reset event handler", () => {
      component.reset.emit = jest.fn();

      component.onReset();

      expect(component.reset.emit).toHaveBeenCalledWith();
    });

    describe("UI Interaction", () => {
      it("should call the emit method of the reset event handler", () => {
        component.reset.emit = jest.fn();

        const buttonElement = fixture.debugElement.query(
          By.css("[data-test-id='reset-button']")
        );
        buttonElement.triggerEventHandler("click", {});

        expect(component.reset.emit).toHaveBeenCalledWith();
      });
    });
  });

  describe("watchColumnValueChangesOf", () => {
    it("should call the callback on valueChange", done => {
      const formGroup = new FormGroup({
        0: new FormGroup({
          0: new FormGroup({
            value: new FormControl(false),
            player: new FormControl(null)
          })
        })
      });
      const fakeCallback = jest.fn();

      watchColumnValueChangesOf(formGroup, fakeCallback);

      formGroup.valueChanges.subscribe(() => {
        expect(fakeCallback).toHaveBeenCalled();
        done();
      });

      formGroup.patchValue({
        0: {
          0: {
            value: true,
            player: faker.name.firstName()
          }
        }
      });
    });
  });

  describe("andSetPlayerIfCheckedTo", () => {
    it("should set the player form control if the column is checked", () => {
      const column: Column = {
        value: true,
        player: null
      };
      const columnFormGroup = new FormGroup({
        value: new FormControl(false),
        player: new FormControl(null)
      });
      const playerName = faker.name.firstName();

      andSetPlayerIfCheckedTo(playerName)(column, columnFormGroup);

      expect(columnFormGroup.value.player).not.toBeNull();
      expect(columnFormGroup.value.player).toBe(playerName);
    });
  });
});
