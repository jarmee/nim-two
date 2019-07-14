import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BoardModule } from './board/board.module';
import { GameEngineModule } from './shared/game-engine/game-engine.module';
import { PlayerType } from './shared/game-engine/turn/turn.model';
import { NIM_AI_RULES } from './shared/games/nim/nim.ai';
import { NIM_BOARD } from './shared/games/nim/nim.board';
import { NIM_MESSAGE_PRODUCER } from './shared/games/nim/nim.messages';
import { NIM_GAME_RULES } from './shared/games/nim/nim.rules';

const PLAYERS = [
  {
    name: '😎',
    type: PlayerType.Human
  },
  {
    name: '🤖',
    type: PlayerType.Artificial
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BoardModule,
    GameEngineModule.forRoot(NIM_BOARD, PLAYERS, NIM_GAME_RULES, NIM_AI_RULES, NIM_MESSAGE_PRODUCER)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
