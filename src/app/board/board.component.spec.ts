import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { GameEngineFacade } from '../shared/game-engine';
import { BoardBuilder } from '../shared/game-engine/board/board.builder';
import { GameEngineModule } from '../shared/game-engine/game-engine.module';
import { GameEngineService } from '../shared/game-engine/game-engine.service';
import { playerFactory, PlayerType } from '../shared/game-engine/turn/turn.model';
import { NIM_AI_RULES } from '../shared/games/nim/nim.ai';
import { NIM_BOARD } from '../shared/games/nim/nim.board';
import { NIM_GAME_RULES } from '../shared/games/nim/nim.rules';
import { BoardComponent } from './board.component';
import { BoardFormBuilderService } from './form/board-form-builder.service';
import { BoardFormComponent } from './form/board-form.component';
import { MatchControlComponent } from './form/match-control/match-control.component';
import { PlayerBatchComponent } from './form/player-batch/player-batch.component';

describe('BoardComponent', () => {
  const PLAYERS = [playerFactory('😎', PlayerType.Human), playerFactory('🤖', PlayerType.Artificial)];
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;
  let gameEngine: GameEngineService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent, BoardFormComponent, MatchControlComponent, PlayerBatchComponent],
      imports: [GameEngineModule.forRoot(NIM_BOARD, PLAYERS, NIM_GAME_RULES, NIM_AI_RULES), ReactiveFormsModule],
      providers: [BoardFormBuilderService]
    }).compileComponents();
  }));

  beforeEach(() => {
    gameEngine = TestBed.get(GameEngineFacade);
    gameEngine.executePlay = jest.fn();
    gameEngine.reset = jest.fn();
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match the snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });

  describe('onExecutePlay', () => {
    const board = BoardBuilder.create()
      .addRowWithColumns(false, false, false, false, false, false, false, false, false, false, false, false, false)
      .build();

    it('should call the executePlay method of the GameEngine', () => {
      component.onExecutePlay(board);

      expect(gameEngine.executePlay).toHaveBeenCalledWith(board);
    });

    describe('UI Interaction', () => {
      beforeEach(() => {
        component.onExecutePlay = jest.fn();
      });

      it('should call the onExecutePlay event handler on board change', () => {
        const boardElement = fixture.debugElement.query(By.css("[data-test-id='board']"));

        boardElement.triggerEventHandler('executePlay', board);

        expect(component.onExecutePlay).toHaveBeenCalledWith(board);
      });
    });
  });

  describe('onReset', () => {
    it('should call the reset method of the GameEngine', () => {
      component.onReset();

      expect(gameEngine.reset).toHaveBeenCalled();
    });

    describe('UI Interaction', () => {
      beforeEach(() => {
        component.onReset = jest.fn();
      });

      it('should call the onExecutePlay event handler on board change', () => {
        const boardElement = fixture.debugElement.query(By.css("[data-test-id='board']"));

        boardElement.triggerEventHandler('reset', null);

        expect(component.onReset).toHaveBeenCalled();
      });
    });
  });

  afterEach(() => {
    (gameEngine.executePlay as jest.Mock).mockReset();
    (gameEngine.reset as jest.Mock).mockReset();
  });
});
