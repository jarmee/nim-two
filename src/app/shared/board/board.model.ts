export type Column = {
  value: boolean;
  player?: string;
};
export type Columns = Record<number, Column>;
export type Board = {
  [key: number]: Columns;
  errorMessage?: string;
};
export type BoardDifference = {
  newColumn: Column;
  currentColumn: Column;
  path: string[];
};
export type BoardDifferences = Array<BoardDifference>;
