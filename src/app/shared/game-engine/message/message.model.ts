import { InjectionToken } from '@angular/core';
import { GameStatus } from '../state/state.model';
import { Player } from '../turn/turn.model';

export type MessageProducer = (status: GameStatus, player: Player) => string;

export const defaultMessageProducer: MessageProducer = (status: GameStatus, player: Player) => '';

export const GAME_MESSAGE_PRODUCER: InjectionToken<MessageProducer> = new InjectionToken<MessageProducer>(
  'GAME_MESSAGE_PRODUCER'
);
