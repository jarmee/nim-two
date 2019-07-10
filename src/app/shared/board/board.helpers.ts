import {
  Board,
  BoardDifference,
  BoardDifferences,
  Column,
  Columns,
  Path
} from "./board.model";

function createBoardDifferencesOf(
  boardA: Board,
  andBoardB: Board
): BoardDifferences {
  const sourceBoard = boardA || andBoardB;
  return Object.keys(sourceBoard)
    .map(rowKey =>
      Object.keys(sourceBoard[rowKey]).map((columnKey: string) => ({
        newColumn: findColumnOf(boardA, [rowKey, columnKey]),
        currentColumn: findColumnOf(andBoardB, [rowKey, columnKey]),
        path: [rowKey, columnKey]
      }))
    )
    .reduce(
      (flatten: [Column, Column][], element: any) => [...flatten, ...element],
      []
    );
}

function columnsWithEqualValues(difference: BoardDifference): boolean {
  return (
    !difference.newColumn ||
    !difference.currentColumn ||
    difference.newColumn.value !== difference.currentColumn.value
  );
}

export function findColumnOf(board: Board, path: Path): Column | null {
  if (!board) return null;
  if (!path || !path.length) return null;

  return path.reduce((selectedProperty: any, pathElement: string) => {
    if (!selectedProperty || !selectedProperty[pathElement]) return null;
    return selectedProperty[pathElement];
  }, board);
}

export function differenceOf(
  boardA: Board,
  andBoardB: Board
): BoardDifferences {
  if (!boardA && !andBoardB) return [];

  return createBoardDifferencesOf(boardA, andBoardB).filter(
    columnsWithEqualValues
  );
}

export const withColumnValueFalseFilter = (column: Column) => !column.value;

export function countColumnsOf(
  board: Board,
  withFilter: (column: Column) => boolean
): number {
  if (!board) return 0;

  return Object.values(board)
    .map((columns: Columns) => Object.values(columns).filter(withFilter).length)
    .reduce(
      (amount: number, columnCount: number) => (amount += columnCount),
      0
    );
}
