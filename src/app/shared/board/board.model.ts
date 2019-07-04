export type Column = {
  value: boolean;
  player?: string;
};
export type Columns = Record<number, boolean>;
export type Board = Record<number, Columns>;
