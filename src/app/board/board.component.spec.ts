import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { boardFactory } from "../shared/board/testing/board.mock";
import { GameEngineModule } from "../shared/game-engine/game-engine.module";
import { GameEngineService } from "../shared/game-engine/game-engine.service";
import { gameStateFactory } from "../shared/game-engine/testing/game-engine.mock";
import { BoardComponent } from "./board.component";
import { BoardFormBuilderService } from "./form/board-form-builder.service";
import { BoardFormComponent } from "./form/board-form.component";
import { MatchControlComponent } from "./form/match-control/match-control.component";

describe("BoardComponent", () => {
  const initialGameState = gameStateFactory.build();

  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let gameEngine: GameEngineService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent, BoardFormComponent, MatchControlComponent],
      imports: [
        GameEngineModule.forRoot(initialGameState),
        ReactiveFormsModule
      ],
      providers: [BoardFormBuilderService]
    }).compileComponents();
  }));

  beforeEach(() => {
    gameEngine = TestBed.get(GameEngineService);
    gameEngine.executePlay = jest.fn();
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

      afterEach(() => {
        (component.onExecutePlay as jest.Mock).mockClear();
      });
    });
  });

  afterEach(() => {
    (gameEngine.executePlay as jest.Mock).mockClear();
  });
});
