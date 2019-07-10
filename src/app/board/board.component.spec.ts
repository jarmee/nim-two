import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { boardFactory } from "../shared/board/testing/board.mock";
import { GameEngineModule } from "../shared/game-engine/game-engine.module";
import { GameEngineService } from "../shared/game-engine/game-engine.service";
import { NIM_KI_RULES } from "../shared/rules/nim/nim.ai";
import { NIM_RULES } from "../shared/rules/nim/nim.rules";
import { NIM_GAME_STATE } from "../shared/rules/nim/nim.state";
import { BoardComponent } from "./board.component";
import { BoardFormBuilderService } from "./form/board-form-builder.service";
import { BoardFormComponent } from "./form/board-form.component";
import { MatchControlComponent } from "./form/match-control/match-control.component";

describe("BoardComponent", () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let gameEngine: GameEngineService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent, BoardFormComponent, MatchControlComponent],
      imports: [
        GameEngineModule.forRoot(NIM_GAME_STATE, NIM_RULES, NIM_KI_RULES),
        ReactiveFormsModule
      ],
      providers: [BoardFormBuilderService]
    }).compileComponents();
  }));

  beforeEach(() => {
    gameEngine = TestBed.get(GameEngineService);
    gameEngine.executePlay = jest.fn();
    gameEngine.reset = jest.fn();
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match the snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });

  describe("onExecutePlay", () => {
    const board = boardFactory();

    it("should call the executePlay method of the GameEngine", () => {
      component.onExecutePlay(board);

      expect(gameEngine.executePlay).toHaveBeenCalledWith(board);
    });

    describe("UI Interaction", () => {
      beforeEach(() => {
        component.onExecutePlay = jest.fn();
      });

      it("should call the onExecutePlay event handler on board change", () => {
        const boardElement = fixture.debugElement.query(
          By.css("[data-test-id='board']")
        );

        boardElement.triggerEventHandler("executePlay", board);

        expect(component.onExecutePlay).toHaveBeenCalledWith(board);
      });
    });
  });

  describe("onReset", () => {
    it("should call the reset method of the GameEngine", () => {
      component.onReset();

      expect(gameEngine.reset).toHaveBeenCalled();
    });

    describe("UI Interaction", () => {
      beforeEach(() => {
        component.onReset = jest.fn();
      });

      it("should call the onExecutePlay event handler on board change", () => {
        const boardElement = fixture.debugElement.query(
          By.css("[data-test-id='board']")
        );

        boardElement.triggerEventHandler("reset", null);

        expect(component.onReset).toHaveBeenCalled();
      });
    });
  });

  afterEach(() => {
    (gameEngine.executePlay as jest.Mock).mockReset();
    (gameEngine.reset as jest.Mock).mockReset();
  });
});
