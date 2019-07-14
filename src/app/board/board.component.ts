import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GameEngineFacade } from '../shared/game-engine';
import { Board } from '../shared/game-engine/board/board.model';
import { GameStatus } from '../shared/game-engine/state/state.model';
import { Player } from '../shared/game-engine/turn/turn.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  amount$: Observable<number> = this.gameEngine.amount$;

  board$: Observable<Board> = this.gameEngine.board$;

  status$: Observable<GameStatus> = this.gameEngine.status$;

  selectedPlayer$: Observable<Player> = this.gameEngine.selectedPlayer$;

  messages$: Observable<string> = this.gameEngine.messages$;

  constructor(private gameEngine: GameEngineFacade) {}

  onExecutePlay(board: Board) {
    this.gameEngine.executePlay(board);
  }

  onReset() {
    this.gameEngine.reset();
  }
}
