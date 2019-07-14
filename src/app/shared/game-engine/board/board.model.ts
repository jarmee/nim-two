export enum BoardStatus {
  InProgress = 'IN_PROGRESS'
}
export type Column = {
  value: boolean;
  player?: string;
  errorMessage?: string;
};
export type Columns = Record<number, Column>;
export type Board = {
  [key: number]: Columns;
};
export type Path = string[];
export type BoardDifference = {
  newColumn: Column;
  currentColumn: Column;
  path: Path;
};
export type BoardDifferences = Array<BoardDifference>;
