import { Store } from "../state/store";
import { GameState } from "./game-engine.model";

export class GameEngineStore extends Store<GameState> {
  constructor(gameState: GameState) {
    super(gameState);
  }
}
