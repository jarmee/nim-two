import { TestBed } from '@angular/core/testing';
import { Player, playerFactory, Players, PlayerType, TURN_STATE_STORE } from './turn.model';
import { nextAvailableIndexOf, TurnService } from './turn.service';
import { TurnStore } from './turn.store';

describe('TurnServiceService', () => {
  const player1: Player = playerFactory('Player 1', PlayerType.Human);
  const player2: Player = playerFactory('Player 2', PlayerType.Artificial);
  const players: Players = [player1, player2];

  let service: TurnService;
  let store: TurnStore;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        TurnService,
        {
          provide: TURN_STATE_STORE,
          useFactory: () => new TurnStore(players)
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(TurnService);
    store = TestBed.get(TURN_STATE_STORE);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('players$', () => {
    it('should return the players', done => {
      service.players$.subscribe((players: Players) => {
        expect(players).toEqual([player1, player2]);
        done();
      });
    });
  });

  describe('selectedPlayer$', () => {
    it('should return the selected player', done => {
      const selectedPlayer = players[0];
      service.selectedPlayer$.subscribe((player: Player) => {
        expect(player).toEqual(selectedPlayer);
        done();
      });
    });
  });

  describe('switchPlayers', () => {
    describe('nextAvailableIndexOf', () => {
      describe('should return the next available index', () => {
        it('should return 1', () => {
          const selected = 0;
          expect(nextAvailableIndexOf(players, selected)).toBe(1);
        });

        it('should return 0', () => {
          const selected = 1;
          expect(nextAvailableIndexOf(players, selected)).toBe(0);
        });
      });
    });

    it('it should call the next method of the store with the switched player', () => {
      store.next = jest.fn();

      service.switchPlayer();

      expect(store.next).toHaveBeenCalledWith({
        selected: 1
      });
    });
  });
});
