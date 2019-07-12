import { cloneDeep } from "lodash";
import { BehaviorSubject } from "rxjs";

export class Store<T> extends BehaviorSubject<T> {
  snapshot: T;
  initialState: T;

  constructor(gameState: T) {
    super(gameState);
    this.snapshot = cloneDeep(gameState);
    this.initialState = cloneDeep(gameState);
  }

  next(partialState: Partial<T>) {
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
