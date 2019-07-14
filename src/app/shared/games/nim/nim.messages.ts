import { MessageProducer } from '../../game-engine/message/message.model';
import { GameStatus } from '../../game-engine/state/state.model';
import { Player } from '../../game-engine/turn/turn.model';

export const NIM_MESSAGE_PRODUCER: MessageProducer = (status: GameStatus, player: Player) => {
  return 'Hello World';
};
