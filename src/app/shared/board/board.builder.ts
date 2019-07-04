import { Board } from "./board.model";

export class BoardBuilder {
  board: Board = {};

  currentIndex = 0;

  addRowWithColumns(...columns: boolean[]): BoardBuilder {
    this.board = {
      ...this.board,
      [this.currentIndex]: {
        ...columns
          .map((value: boolean, index: number) => ({
            [index]: value
          }))
          .reduce((row: any, column: any) => ({ ...row, ...column }), {})
      }
    };
    this.currentIndex++;
    return this;
  }

  build(): Board {
    return this.board;
  }

  static create(): BoardBuilder {
    return new BoardBuilder();
  }
}
