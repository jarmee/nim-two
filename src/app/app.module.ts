import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BoardModule } from "./board/board.module";
import { GameEngineModule } from "./shared/game-engine/game-engine.module";
import { BoardBuilder } from "./shared/board/board.builder";

const initialGameState = BoardBuilder.create().addRowWithColumns(
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BoardModule,
    GameEngineModule.forRoot(initialGameState)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
