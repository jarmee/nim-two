import * as faker from 'faker';
import { GameStatus } from '../../game-engine/state/state.model';
import { playerFactory, PlayerType } from '../../game-engine/turn/turn.model';
import {
  ARTIFICIAL_PLAYER_WINS,
  BOT_THINKING,
  DEFAULT_MESSAGE,
  errorCodeToMessageMap,
  HUMAN_PLAYER_WINS,
  NIM_MESSAGE_PRODUCER,
  UNKNOWN_ERROR
} from './nim.messages';
import { MAXIMUM_OF_MATCHES_EXCEEDED_ERROR, NOTHING_CHANGED_ERROR } from './nim.rules';

describe('NimMessages', () => {
  describe('NIM_MESSAGE_PRODUCER', () => {
    it('should return the default message if no case matches', () => {
      expect(NIM_MESSAGE_PRODUCER(null, null, null)).toBe(DEFAULT_MESSAGE);
    });

    it('should return the expected message if the GameStatus is GameOver and the PlayerType is Artificial', () => {
      const status = GameStatus.GameOver;
      const playerName = faker.name.firstName();
      const player = playerFactory(playerName, PlayerType.Human);

      expect(NIM_MESSAGE_PRODUCER(status, player, null)).toBe(ARTIFICIAL_PLAYER_WINS);
    });

    it('should return the expected message if the GameStatus is GameOver and the PlayerType is Artificial', () => {
      const status = GameStatus.GameOver;
      const playerName = faker.name.firstName();
      const player = playerFactory(playerName, PlayerType.Artificial);

      expect(NIM_MESSAGE_PRODUCER(status, player, null)).toBe(HUMAN_PLAYER_WINS);
    });

    it('should return the expected message if the GameStatus is Valid and the PlayerType is Artificial', () => {
      const status = GameStatus.Valid;
      const playerName = faker.name.firstName();
      const player = playerFactory(playerName, PlayerType.Artificial);

      expect(NIM_MESSAGE_PRODUCER(status, player, null)).toBe(BOT_THINKING);
    });

    it('should return the expected message if the GameStatus is Errornous (MAXIMUM_OF_MATCHES_EXCEEDED_ERROR)', () => {
      const status = GameStatus.Errornous;
      const playerName = faker.name.firstName();
      const player = playerFactory(playerName, PlayerType.Artificial);

      expect(NIM_MESSAGE_PRODUCER(status, player, MAXIMUM_OF_MATCHES_EXCEEDED_ERROR)).toBe(
        errorCodeToMessageMap[MAXIMUM_OF_MATCHES_EXCEEDED_ERROR]
      );
    });

    it('should return the expected message if the GameStatus is Errornous (NOTHING_CHANGED_ERROR)', () => {
      const status = GameStatus.Errornous;
      const playerName = faker.name.firstName();
      const player = playerFactory(playerName, PlayerType.Artificial);

      expect(NIM_MESSAGE_PRODUCER(status, player, NOTHING_CHANGED_ERROR)).toBe(
        errorCodeToMessageMap[NOTHING_CHANGED_ERROR]
      );
    });

    it('should return the expected message if the GameStatus is Errornous (UNKNOWN_ERROR)', () => {
      const status = GameStatus.Errornous;
      const playerName = faker.name.firstName();
      const player = playerFactory(playerName, PlayerType.Artificial);

      expect(NIM_MESSAGE_PRODUCER(status, player, faker.random.word())).toBe(UNKNOWN_ERROR);
    });
  });
});
