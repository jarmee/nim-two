import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { GameEngineService } from "../shared/game-engine/game-engine.service";
import { Board } from "../shared/board/board.model";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent {
  amount$: Observable<number> = this.gameEngine.amount$;

  board$: Observable<Board> = this.gameEngine.board$;

  constructor(private gameEngine: GameEngineService) {}

  onExecutePlay(amount: number) {
    this.gameEngine.executePlay(amount);
  }

  onChange(board: Board) {
    console.log(board);
  }
}
