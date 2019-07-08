import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BoardModule } from "./board/board.module";
import { GameEngineModule } from "./shared/game-engine/game-engine.module";
import { NIM_GAME_STATE } from "./shared/rules/nim/nim.state";
import { NIM_RULES as NIM_GAME_RULES } from "./shared/rules/nim/nim.rules";
import { NIM_KI_RULES } from './shared/rules/nim/nim.ki';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BoardModule,
    GameEngineModule.forRoot(NIM_GAME_STATE, NIM_GAME_RULES, NIM_KI_RULES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
