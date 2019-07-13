import { Board } from "../board/board.model";
import { Store } from "../state/store";
import { GameState, initialGameState } from "./game-engine.model";

export class GameEngineStore extends Store<GameState> {
  constructor(board: Board) {
    super({
      ...initialGameState,
      board
    });
  }
}
