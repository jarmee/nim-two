import { BehaviorSubject } from "rxjs";
import { GameState } from "./game-engine.model";

export class GameEngineStore extends BehaviorSubject<GameState> {
  snapshot: GameState;
  initialState: GameState;

  constructor(gameState: GameState) {
    super(gameState);
    this.snapshot = gameState;
    this.initialState = gameState;
  }

  next(partialState: Partial<GameState>) {
    const newState = {
      ...this.snapshot,
      ...partialState
    };
    this.snapshot = newState;
    super.next(newState);
  }

  reset() {
    super.next(this.initialState);
  }
}
