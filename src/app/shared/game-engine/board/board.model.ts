import { InjectionToken } from '@angular/core';

export enum BoardStatus {
  InProgress = 'IN_PROGRESS'
}
export interface Column {
  value: boolean;
  player?: string;
  errorMessage?: string;
}
export type Columns = Record<number, Column>;
export interface Board {
  [key: number]: Columns;
}
export type Path = string[];
export interface BoardDifference {
  newColumn: Column;
  currentColumn: Column;
  path: Path;
}
export type BoardDifferences = Array<BoardDifference>;
export const BOARD: InjectionToken<Board> = new InjectionToken<Board>('BOARD');
