import { ModuleWithProviders, NgModule } from '@angular/core';
import { Board } from './board/board.model';
import { AiRules, GAME_AI_RULES } from './bot/bot.model';
import { BotService } from './bot/bot.service';
import { GameEngineFacade } from './game-engine.facade';
import { GAME_MESSAGE_PRODUCER, MessageProducer } from './message/message.model';
import { MessageService } from './message/message.service';
import { GameRules, GAME_RULES } from './rule/rule.model';
import { RuleService } from './rule/rule.service';
import { STATE_STORE } from './state/state.model';
import { StateService } from './state/state.service';
import { GameStateStore } from './state/state.store';
import { Players, TURN_STATE_STORE } from './turn/turn.model';
import { TurnService } from './turn/turn.service';
import { TurnStore } from './turn/turn.store';

@NgModule({})
export class GameEngineModule {
  static forRoot(
    board: Board,
    players: Players,
    rules: GameRules,
    aiRules: AiRules,
    messageProducer: MessageProducer
  ): ModuleWithProviders {
    return {
      ngModule: GameEngineModule,
      providers: [
        {
          provide: STATE_STORE,
          useFactory: () => new GameStateStore(board)
        },
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(players)
        },
        {
          provide: GAME_RULES,
          useValue: rules
        },
        {
          provide: GAME_AI_RULES,
          useValue: aiRules
        },
        {
          provide: GAME_MESSAGE_PRODUCER,
          useValue: messageProducer
        },
        BotService,
        RuleService,
        TurnService,
        StateService,
        MessageService,
        GameEngineFacade
      ]
    };
  }
}
