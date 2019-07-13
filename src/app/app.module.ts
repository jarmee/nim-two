import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BoardModule } from "./board/board.module";
import { GameEngineModule } from "./shared/game-engine/game-engine.module";
import {
  playerFactory,
  PlayerType
} from "./shared/game-engine/turn/turn.model";
import { NIM_KI_RULES } from "./shared/rules/nim/nim.ai";
import { NIM_BOARD } from "./shared/rules/nim/nim.board";
import { NIM_GAME_RULES } from "./shared/rules/nim/nim.rules";

const PLAYERS = [
  playerFactory("😎", PlayerType.Human),
  playerFactory("🤖", PlayerType.Artificial)
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BoardModule,
    GameEngineModule.forRoot(NIM_BOARD, PLAYERS, NIM_GAME_RULES, NIM_KI_RULES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
