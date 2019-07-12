import { InjectionToken } from "@angular/core";
import { TurnStore } from "./turn.store";

export enum PlayerType {
  Human,
  Artificial
}

export type PlayerTypeDescriptionMap = Record<PlayerType, string>;

export interface Player {
  type: PlayerType;
}

export type Players = Array<Player>;

export const playerFactory: (name: string, type: PlayerType) => Player = (
  name: string,
  type: PlayerType
) => ({
  name,
  type
});

export const playerTypeIconMap: PlayerTypeDescriptionMap = {
  [PlayerType.Artificial]: "🤖",
  [PlayerType.Human]: "😎"
};

export const PLAYERS: InjectionToken<Players> = new InjectionToken<Players>(
  "PLAYERS"
);

export const TURN_STATE_STORE: InjectionToken<TurnStore> = new InjectionToken<
  TurnStore
>("TURN_STATE_STORE");

export interface TurnState {
  players: Players;
  selectPlayer: number;
}

export const initialTurnState = {
  players: [],
  selectPlayer: 0
};
