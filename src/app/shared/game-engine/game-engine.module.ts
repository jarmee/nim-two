import { ModuleWithProviders, NgModule } from "@angular/core";
import {
  GameRules,
  GameState,
  GAME_AI_RULES,
  GAME_RULES,
  GAME_STATE_STORE
} from "./game-engine.model";
import { GameEngineService } from "./game-engine.service";
import { GameEngineStore } from "./game-engine.store";

@NgModule({})
export class GameEngineModule {
  static forRoot(
    initialState: GameState,
    rules: GameRules,
    aiRules: GameRules
  ): ModuleWithProviders {
    return {
      ngModule: GameEngineModule,
      providers: [
        {
          provide: GAME_STATE_STORE,
          useFactory: () => new GameEngineStore(initialState)
        },
        {
          provide: GAME_RULES,
          useValue: rules
        },
        {
          provide: GAME_AI_RULES,
          useValue: aiRules
        },
        GameEngineService
      ]
    };
  }
}
