import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Board } from "../shared/board/board.model";
import { GameEngineService } from "../shared/game-engine/game-engine.service";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent {
  amount$: Observable<number> = this.gameEngine.amount$;

  board$: Observable<Board> = this.gameEngine.board$;

  constructor(private gameEngine: GameEngineService) {}

  onExecutePlay(board: Board) {
    this.gameEngine.executePlay(board);
  }
}
