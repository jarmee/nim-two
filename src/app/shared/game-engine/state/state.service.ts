import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GameState, STATE_STORE } from "./state.model";
import { GameStateStore } from "./state.store";

@Injectable()
export class StateService {
  state$: Observable<GameState> = this.store;

  constructor(@Inject(STATE_STORE) private store: GameStateStore) {}

  updateState(state: Partial<GameState>) {
    this.store.next(state);
  }

  resetState() {
    this.store.reset();
  }
}
