import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardFormComponent } from "./board-form.component";
import { BoardFormBuilderService } from "./board-form-builder.service";
import { ReactiveFormsModule } from "@angular/forms";
import { boardFactory } from "src/app/shared/board/testing/board.mock";
import { SimpleChange, SimpleChanges } from "@angular/core";
import { Board } from "src/app/shared/board/board.model";
import { Board } from "src/app/shared/board/board.model";

describe("BoardFormComponent", () => {
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
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match the snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });

  describe("ngOnChanges", () => {
    it("should set the board property", () => {
      const changedBoard: Board = boardFactory();
      const changes: SimpleChanges = {
        board: new SimpleChange(null, changedBoard, true)
      };
      component.board = null;

      component.ngOnChanges(changes);

      expect(component.board).toBe(changedBoard);
    });
  });
});
