import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Board } from "../shared/board/board.model";
import { BotService } from "../shared/game-engine/bot/bot.service";
import { GameStatus } from "../shared/game-engine/game-engine.model";
import { GameEngineService } from "../shared/game-engine/game-engine.service";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"]
})
export class BoardComponent {
  amount$: Observable<number> = this.gameEngine.amount$;

  board$: Observable<Board> = this.gameEngine.board$;

  status$: Observable<GameStatus> = this.gameEngine.status$;

  constructor(
    private gameEngine: GameEngineService,
    private botService: BotService
  ) {}

  onExecutePlay(board: Board) {
    this.gameEngine.executePlay(board);
  }

  onReset() {
    this.gameEngine.reset();
  }
}
