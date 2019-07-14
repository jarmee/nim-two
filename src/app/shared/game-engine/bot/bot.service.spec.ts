import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { NIM_BOARD } from '../../games/nim/nim.board';
import { BoardBuilder } from '../board/board.builder';
import { RuleService } from '../rule/rule.service';
import { GameState, initialGameState, STATE_STORE } from '../state/state.model';
import { StateService } from '../state/state.service';
import { GameStateStore } from '../state/state.store';
import { playerFactory, PlayerType, TURN_STATE_STORE } from '../turn/turn.model';
import { TurnService } from '../turn/turn.service';
import { TurnStore } from '../turn/turn.store';
import { GAME_AI_RULES } from './bot.model';
import { BotService } from './bot.service';

describe('BotService', () => {
  const player1 = playerFactory('😎', PlayerType.Human);
  const player2 = playerFactory('🤖', PlayerType.Artificial);
  const PLAYERS = [player2, player1];
  let service: BotService;
  let turnService: TurnService;
  let stateService: StateService;
  let ruleService: RuleService;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        BotService,
        TurnService,
        {
          provide: STATE_STORE,
          useFactory: () => new GameStateStore(NIM_BOARD)
        },
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(PLAYERS)
        },
        {
          provide: GAME_AI_RULES,
          useValue: []
        },
        RuleService,
        StateService
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(BotService);
    turnService = TestBed.get(TurnService);
    stateService = TestBed.get(StateService);
    ruleService = TestBed.get(RuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('calculateState$', () => {
    it('should emit a new game state which matches the snapshot', done => {
      ruleService.applyRules = jest.fn();
      stateService.state$ = of({
        ...initialGameState,
        board: BoardBuilder.create()
          .addRowWithColumns(false, false, false, false, false, false, false, false, false, false, false, false, false)
          .build()
      });
      turnService.selectedPlayer$ = of(player2);

      service.calculateState$.subscribe((actual: GameState) => {
        expect(actual).toMatchSnapshot();
        expect(ruleService.applyRules).toHaveBeenCalled();
        done();
      });
    });
  });
});
