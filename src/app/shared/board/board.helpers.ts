import { Board, Path } from "./board.model";

export function findColumnOf(board: Board, path: Path) {
  if (!board) return null;
  if (!path || !path.length) return null;

  return path.reduce((selectedProperty: any, pathElement: string) => {
    if (!selectedProperty || !selectedProperty[pathElement]) return null;
    return selectedProperty[pathElement];
  }, board);
}
