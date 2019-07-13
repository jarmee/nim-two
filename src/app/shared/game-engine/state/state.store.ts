import { Board } from "../../board/board.model";
import { Store } from "../../state/store";
import { GameState, initialGameState } from "./state.model";

export class GameStateStore extends Store<GameState> {
  constructor(board: Board) {
    super({
      ...initialGameState,
      board
    });
  }
}
