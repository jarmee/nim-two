import { Board, BoardDifference, BoardDifferences, Column, Columns, Path } from './board.model';

function createBoardDifferencesOf(boardA: Board, andBoardB: Board): BoardDifferences {
  const sourceBoard = boardA || andBoardB;
  return Object.keys(sourceBoard)
    .map(rowKey =>
      Object.keys(sourceBoard[rowKey]).map((columnKey: string) => ({
        newColumn: findColumnOf(boardA, [rowKey, columnKey]),
        currentColumn: findColumnOf(andBoardB, [rowKey, columnKey]),
        path: [rowKey, columnKey]
      }))
    )
    .reduce((flatten: [Column, Column][], element: any) => [...flatten, ...element], []);
}

export function areColumnsDifferentByValue(newColumn: Column, currentColumn: Column): boolean {
  if (!newColumn && !currentColumn) {
    return false;
  }
  if (!newColumn || !currentColumn) {
    return true;
  }
  return newColumn.value !== currentColumn.value;
}

export function findColumnOf(board: Board, path: Path): Column | null {
  if (!board) {
    return null;
  }
  if (!path || !path.length) {
    return null;
  }

  return path.reduce((selectedProperty: any, pathElement: string) => {
    if (!selectedProperty || !selectedProperty[pathElement]) {
      return null;
    }
    return selectedProperty[pathElement];
  }, board);
}

export function differenceOf(boardA: Board, andBoardB: Board): BoardDifferences {
  if (!boardA && !andBoardB) {
    return [];
  }

  return createBoardDifferencesOf(boardA, andBoardB).filter(({ newColumn, currentColumn }: BoardDifference) =>
    areColumnsDifferentByValue(newColumn, currentColumn)
  );
}

export const withColumnValueFalseFilter = (column: Column) => !column.value;

export function countColumnsOf(board: Board, withFilter: (column: Column) => boolean): number {
  if (!board) {
    return 0;
  }

  return Object.values(board)
    .map((columns: Columns) => Object.values(columns).filter(withFilter).length)
    .reduce((amount: number, columnCount: number) => (amount += columnCount), 0);
}

export function exchangeColumnsOf(
  board: Board,
  exchangeColumnCallback: (column: Column, path?: Path) => Column
): Board {
  if (!board) {
    return null;
  }

  return Object.keys(board)
    .map(rowKey => ({
      [rowKey]: Object.keys(board[rowKey])
        .map(columnKey => ({
          [columnKey]: exchangeColumnCallback
            ? exchangeColumnCallback(board[rowKey][columnKey], [rowKey, columnKey])
            : { ...board[rowKey][columnKey] }
        }))
        .reduce((newRow, column) => ({ ...newRow, ...column }))
    }))
    .reduce((newBoard, row) => ({ ...newBoard, ...row }), {});
}
