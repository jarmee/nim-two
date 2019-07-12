import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Players, TurnState, TURN_STATE_STORE } from "./turn.model";
import { TurnStore } from "./turn.store";

@Injectable()
export class TurnService {
  players$: Observable<Players> = this.store.pipe(
    map((state: TurnState) => state.players)
  );

  constructor(@Inject(TURN_STATE_STORE) private store: TurnStore) {}
}
