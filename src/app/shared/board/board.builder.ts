import { Board } from "./board.model";

export class BoardBuilder {
  board: Board = {};

  addRowWithColumns(...columns: boolean[]): BoardBuilder {
    const currentIndex = Object.keys(this.board).length++;
    this.board = {
      ...this.board,
      [currentIndex]: {
        ...columns
          .map((value: boolean, index: number) => ({
            [index]: {
              value,
              player: null
            }
          }))
          .reduce((row: any, column: any) => ({ ...row, ...column }), {})
      }
    };
    return this;
  }

  build(): Board {
    return this.board;
  }

  static create(): BoardBuilder {
    return new BoardBuilder();
  }
}
