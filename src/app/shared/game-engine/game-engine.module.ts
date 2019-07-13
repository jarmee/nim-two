import { ModuleWithProviders, NgModule } from "@angular/core";
import {
  AiRules,
  GameRules,
  GameState,
  GAME_AI_RULES,
  GAME_RULES,
  GAME_STATE_STORE
} from "./game-engine.model";
import { GameEngineService } from "./game-engine.service";
import { GameEngineStore } from "./game-engine.store";
import { Players, TURN_STATE_STORE } from "./turn/turn.model";
import { TurnService } from "./turn/turn.service";
import { TurnStore } from "./turn/turn.store";

@NgModule({})
export class GameEngineModule {
  static forRoot(
    initialState: GameState,
    players: Players,
    rules: GameRules,
    aiRules: AiRules
  ): ModuleWithProviders {
    return {
      ngModule: GameEngineModule,
      providers: [
        {
          provide: GAME_STATE_STORE,
          useFactory: () => new GameEngineStore(initialState)
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
        TurnService,
        GameEngineService
      ]
    };
  }
}
