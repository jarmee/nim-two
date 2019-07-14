import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NIM_BOARD } from '../../games/nim/nim.board';
import { BoardBuilder } from '../board/board.builder';
import { GameState, initialGameState, STATE_STORE } from '../state/state.model';
import { StateService } from '../state/state.service';
import { GameStateStore } from '../state/state.store';
import { gameStateFactory } from '../testing/game-engine.mock';
import { playerFactory, PlayerType, TURN_STATE_STORE } from '../turn/turn.model';
import { TurnService } from '../turn/turn.service';
import { TurnStore } from '../turn/turn.store';
import { RuleService } from './rule.service';

describe('RuleService', () => {
  const gameState = gameStateFactory.build();
  const player1 = playerFactory('😎', PlayerType.Human);
  const player2 = playerFactory('🤖', PlayerType.Artificial);
  const PLAYERS = [player1, player2];
  let service: RuleService;
  let turnService: TurnService;
  let stateService: StateService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        RuleService,
        {
          provide: STATE_STORE,
          useFactory: () => new GameStateStore(NIM_BOARD)
        },
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(PLAYERS)
        },
        StateService,
        TurnService
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(RuleService);
    turnService = TestBed.get(TurnService);
    stateService = TestBed.get(StateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('applyRules', () => {
    it('should call the next method of the applyRules$ BehaviorSubject', () => {
      service.applyRules$.next = jest.fn();

      service.applyRules(gameState);

      expect(service.applyRules$.next).toHaveBeenCalledWith(gameState);
    });
  });

  describe('rulesApplied$', () => {
    it('should emit a new game state which matches the snapshot', done => {
      turnService.selectedPlayer$ = of(player1);
      stateService.state$ = of({
        ...initialGameState,
        board: BoardBuilder.create()
          .addRowWithColumns(false, false, false, false, false, false, false, false, false, false, false, false, false)
          .build()
      });
      service.applyRules({
        ...initialGameState,
        board: BoardBuilder.create()
          .addRowWithColumns(true, true, true, false, false, false, false, false, false, false, false, false, false)
          .build()
      });

      service.rulesApplied$.subscribe((actual: GameState) => {
        expect(actual).toMatchSnapshot();
        done();
      });
    });
  });
});
