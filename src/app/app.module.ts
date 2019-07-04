import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from "./app.component";
import { BoardModule } from "./board/board.module";
import { BoardBuilder } from "./shared/board/board.builder";
import { GameEngineModule } from "./shared/game-engine/game-engine.module";

const initialGameState = {
  board: BoardBuilder.create()
    .addRowWithColumns(
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
    )
    .build()
};

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
