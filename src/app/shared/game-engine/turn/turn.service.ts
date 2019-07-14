import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Player, Players, TurnState, TURN_STATE_STORE } from './turn.model';
import { TurnStore } from './turn.store';

export function nextAvailableIndexOf(players: Players, currentIndex): number {
  return (currentIndex + 1) % players.length;
}

@Injectable()
export class TurnService {
  players$: Observable<Players> = this.store.pipe(map((state: TurnState) => state.players));

  selectedPlayer$: Observable<Player> = this.store.pipe(map((state: TurnState) => state.players[state.selected]));

  constructor(@Inject(TURN_STATE_STORE) private store: TurnStore) {}

  switchPlayer() {
    const { players, selected } = this.store.snapshot;
    this.store.next({
      selected: nextAvailableIndexOf(players, selected)
    });
  }
}
