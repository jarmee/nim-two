import { TestBed } from '@angular/core/testing';
import * as faker from 'faker';
import { NIM_BOARD } from '../../games/nim/nim.board';
import { Board } from '../board/board.model';
import { gameStateFactory } from '../testing/game-engine.mock';
import { GameStatus, STATE_STORE } from './state.model';
import { StateService } from './state.service';
import { GameStateStore } from './state.store';

describe('StateService', () => {
  const errorCode = faker.random.words();
  let service: StateService;
  let store: GameStateStore;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        StateService,
        {
          provide: STATE_STORE,
          useFactory: () => new GameStateStore(NIM_BOARD)
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(StateService);
    store = TestBed.get(STATE_STORE);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('errorCode$', () => {
    it('should emit the error code', done => {
      store.next({
        errorMessage: errorCode
      });
      service.errorCode$.subscribe((actualErrorCode: string) => {
        expect(actualErrorCode).toBe(errorCode);
        done();
      });
    });
  });

  describe('amount$', () => {
    it('should emit the current amount', done => {
      service.amount$.subscribe((actualAmount: number) => {
        expect(actualAmount).toBe(13);
        done();
      });
    });
  });

  describe('board$', () => {
    it('should emit the current board', done => {
      service.board$.subscribe((actualBoard: Board) => {
        expect(actualBoard).toEqual(store.snapshot.board);
        done();
      });
    });
  });

  describe('status$', () => {
    it('should emit the current game status', done => {
      service.status$.subscribe((actualStatus: GameStatus) => {
        expect(actualStatus).toBe(store.snapshot.status);
        done();
      });
    });
  });

  describe('updateState', () => {
    const gameState = gameStateFactory.build();

    it('should call the next method of the store', () => {
      store.next = jest.fn();

      service.updateState(gameState);

      expect(store.next).toHaveBeenCalledWith(gameState);
    });
  });

  describe('resetState', () => {
    it('should call the reset method of the store', () => {
      store.reset = jest.fn();

      service.resetState();

      expect(store.reset).toHaveBeenCalled();
    });
  });
});
