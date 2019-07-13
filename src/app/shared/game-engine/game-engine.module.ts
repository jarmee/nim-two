import { ModuleWithProviders, NgModule } from "@angular/core";
import { Board } from "../board/board.model";
import { AiRules, GAME_AI_RULES } from "./bot/bot.model";
import { BotService } from "./bot/bot.service";
import { GAME_STATE_STORE } from "./game-engine.model";
import { GameEngineService } from "./game-engine.service";
import { GameEngineStore } from "./game-engine.store";
import { GameRules, GAME_RULES } from "./rule/rule.model";
import { RuleService } from "./rule/rule.service";
import { Players, TURN_STATE_STORE } from "./turn/turn.model";
import { TurnService } from "./turn/turn.service";
import { TurnStore } from "./turn/turn.store";

@NgModule({})
export class GameEngineModule {
  static forRoot(
    board: Board,
    players: Players,
    rules: GameRules,
    aiRules: AiRules
  ): ModuleWithProviders {
    return {
      ngModule: GameEngineModule,
      providers: [
        {
          provide: GAME_STATE_STORE,
          useFactory: () => new GameEngineStore(board)
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
        BotService,
        RuleService,
        TurnService,
        GameEngineService
      ]
    };
  }
}
