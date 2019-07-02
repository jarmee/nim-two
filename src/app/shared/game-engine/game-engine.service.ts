import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { GameState, GAME_STATE_STORE } from "./game-engine.model";
import { GameEngineStore } from "./game-engine.store";
import { map } from "rxjs/operators";

@Injectable()
export class GameEngineService {
  amount$: Observable<number> = this.store.pipe(
    map((state: GameState) => state.amount)
  );

  constructor(@Inject(GAME_STATE_STORE) private store: GameEngineStore) {}

  executePlay(amountToDecrease: number) {
    const { amount } = this.store.snapshot;
    const newAmount = amount - amountToDecrease;
    this.store.next({
      amount: newAmount
    });
  }
}
