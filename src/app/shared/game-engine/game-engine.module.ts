import { NgModule, InjectionToken, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GameState, GAME_STATE_STORE } from "./game-engine.model";
import { GameEngineService } from "./game-engine.service";
import { GameEngineStore } from "./game-engine.store";

@NgModule({})
export class GameEngineModule {
  static forRoot(initialState: GameState): ModuleWithProviders {
    return {
      ngModule: GameEngineModule,
      providers: [
        {
          provide: GAME_STATE_STORE,
          useFactory: () => new GameEngineStore(initialState)
        },
        GameEngineService
      ]
    };
  }
}