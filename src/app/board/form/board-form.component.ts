import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from "@angular/core";
import { Board, Columns } from "src/app/shared/board/board.model";
import { BoardFormBuilderService } from "./board-form-builder.service";
import { FormGroup } from "@angular/forms";

function areRowsDifferent(currentBoard: Board, previousBoard: Board): boolean {
  return Object.keys(currentBoard).length != Object.keys(previousBoard).length;
}

function areColumnsDifferent(
  currentBoard: Board,
  previousBoard: Board
): boolean {
  return Object.keys(currentBoard)
    .map((rowKey: string) => [currentBoard[rowKey], previousBoard[rowKey]])
    .map(
      ([currentColumns, previousColumns]: [Columns, Columns]) =>
        Object.keys(currentColumns).length !=
        Object.keys(previousColumns).length
    )
    .some((result: boolean) => result);
}

export function hasChanged(currentBoard: Board, previousBoard: Board): boolean {
  if (!currentBoard && !previousBoard) return false;
  if (!currentBoard && previousBoard) return true;
  if (currentBoard && !previousBoard) return true;
  if (areRowsDifferent(currentBoard, previousBoard)) return true;
  if (areColumnsDifferent(currentBoard, previousBoard)) return true;

  return false;
}

@Component({
  selector: "app-board-form",
  templateUrl: "./board-form.component.html",
  styleUrls: ["./board-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardFormComponent implements OnChanges {
  @Input()
  board: Board;

  formGroup: FormGroup = this.formBuilder.initial();

  constructor(private formBuilder: BoardFormBuilderService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.board) {
      const { currentValue, previousValue } = changes.board;
      this.board = currentValue;
      if (hasChanged(currentValue, previousValue)) {
        //FIXME this.formGroup = this.formBuilder.of(currentValue);
      }
      this.formGroup.patchValue(changes.board.currentValue);
    }
  }
}
