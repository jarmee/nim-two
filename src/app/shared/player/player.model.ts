export enum PlayerType {
  Human,
  Artificial
}

export type PlayerTypeDescriptionMap = Record<PlayerType, string>;

export interface Player {
  type: PlayerType;
}

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
