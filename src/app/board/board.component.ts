import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { GameEngineService } from "../shared/game-engine/game-engine.service";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent {
  amount$: Observable<number> = this.gameEngine.amount$;

  constructor(private gameEngine: GameEngineService) {}

  onExecutePlay(amount: number) {
    this.gameEngine.executePlay(amount);
  }
}
