import { InjectionToken } from "@angular/core";

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
