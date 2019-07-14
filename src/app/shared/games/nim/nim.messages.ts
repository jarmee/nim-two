import { GameStatus } from '../../game-engine/state/state.model';
import { Player, PlayerType } from '../../game-engine/turn/turn.model';
import { MAXIMUM_OF_MATCHES_EXCEEDED_ERROR, NOTHING_CHANGED_ERROR } from './nim.rules';

export const errorCodeToMessageMap: Record<string, string> = {
  [MAXIMUM_OF_MATCHES_EXCEEDED_ERROR]: 'Ups! You have exceeded the maximum amount of allowed picks. Try again',
  [NOTHING_CHANGED_ERROR]: 'Oh! Please, select at least one match'
};
export const BOT_THINKING = 'Mhhh...! Let me think...';
export const HUMAN_PLAYER_WINS = 'Game Over! You win...';
export const ARTIFICIAL_PLAYER_WINS = 'Game Over! You loose...';
export const DEFAULT_MESSAGE = 'It`s your turn...';
export const UNKNOWN_ERROR = 'Unknown error code...';

export function NIM_MESSAGE_PRODUCER(status: GameStatus, player: Player, errorCode: string): string {
  if (GameStatus.Valid === status && PlayerType.Artificial === player.type) {
    return BOT_THINKING;
  }
  if (GameStatus.Errornous === status) {
    return errorCodeToMessageMap[errorCode] || UNKNOWN_ERROR;
  }
  if (GameStatus.GameOver === status && PlayerType.Artificial === player.type) {
    return HUMAN_PLAYER_WINS;
  }
  if (GameStatus.GameOver === status && PlayerType.Human === player.type) {
    return ARTIFICIAL_PLAYER_WINS;
  }
  return DEFAULT_MESSAGE;
}
