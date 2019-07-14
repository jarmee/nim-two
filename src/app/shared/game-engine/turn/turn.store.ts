import { Store } from '../../state/store';
import { initialTurnState, Players, TurnState } from './turn.model';

export class TurnStore extends Store<TurnState> {
  constructor(players: Players) {
    super({
      ...initialTurnState,
      players
    });
  }
}
