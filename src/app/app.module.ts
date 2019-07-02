import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { BoardModule } from "./board/board.module";
import { GameEngineModule } from "./shared/game-engine/game-engine.module";

const initialGameState = {
  amount: 13
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
