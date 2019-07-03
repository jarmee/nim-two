import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardComponent } from "./board.component";
import { By } from "@angular/platform-browser";
import { GameEngineModule } from "../shared/game-engine/game-engine.module";
import { gameStateFactory } from "../shared/game-engine/testing/game-engine.mock";
import { GameEngineService } from "../shared/game-engine/game-engine.service";
import * as faker from "faker";
import { BoardFormComponent } from "./form/board-form.component";

describe("BoardComponent", () => {
  const initialGameState = gameStateFactory.build({
    amount: 13
  });

  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let gameEngine: GameEngineService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent, BoardFormComponent],
      imports: [GameEngineModule.forRoot(initialGameState)]
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
    it("should call the executePlay method of the GameEngine", () => {
      const amount = faker.random.number();

      component.onExecutePlay(amount);

      expect(gameEngine.executePlay).toHaveBeenCalledWith(amount);
    });

    describe("UI Interaction", () => {
      beforeEach(() => {
        component.onExecutePlay = jest.fn();
      });

      describe("Amount one", () => {
        it("should call the onExecutePlay event handler on click", () => {
          const buttonElement = fixture.debugElement.query(
            By.css("[data-test-id='execute-play-one']")
          );

          buttonElement.triggerEventHandler("click", {});

          expect(component.onExecutePlay).toHaveBeenCalledWith(1);
        });
      });

      describe("Amount two", () => {
        it("should call the onExecutePlay event handler on click", () => {
          const spyOnOnExecutePlay = jest.spyOn(component, "onExecutePlay");
          const buttonElement = fixture.debugElement.query(
            By.css("[data-test-id='execute-play-two']")
          );

          buttonElement.triggerEventHandler("click", {});

          expect(component.onExecutePlay).toHaveBeenCalledWith(2);
        });
      });

      describe("Amount three", () => {
        it("should call the onExecutePlay event handler on click", () => {
          const spyOnOnExecutePlay = jest.spyOn(component, "onExecutePlay");
          const buttonElement = fixture.debugElement.query(
            By.css("[data-test-id='execute-play-three']")
          );

          buttonElement.triggerEventHandler("click", {});

          expect(component.onExecutePlay).toHaveBeenCalledWith(3);
        });
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
