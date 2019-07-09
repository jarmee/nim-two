import { cloneDeep } from "lodash";
import { BehaviorSubject } from "rxjs";
import { GameState } from "./game-engine.model";

export class GameEngineStore extends BehaviorSubject<GameState> {
  snapshot: GameState;
  initialState: GameState;

  constructor(gameState: GameState) {
    super(gameState);
    this.snapshot = cloneDeep(gameState);
    this.initialState = cloneDeep(gameState);
  }

  next(partialState: Partial<GameState>) {
    const newState = {
      ...this.snapshot,
      ...partialState
    };
    this.snapshot = cloneDeep(newState);
    super.next(newState);
  }

  reset() {
    super.next(this.initialState);
  }
}
