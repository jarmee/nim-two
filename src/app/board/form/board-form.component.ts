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

function areRowsDifferent(currentValue: Board, previousValue: Board): boolean {
  return Object.keys(currentValue).length != Object.keys(previousValue).length;
}

function areColumnsDifferent(
  currentValue: Board,
  previousValue: Board
): boolean {
  return Object.keys(currentValue)
    .map((rowKey: string) => [currentValue[rowKey], previousValue[rowKey]])
    .map(
      ([currentColumns, previousColumns]: [Columns, Columns]) =>
        Object.keys(currentColumns).length !=
        Object.keys(previousColumns).length
    )
    .some((result: boolean) => result);
}

export function hasChanged(currentValue: Board, previousValue: Board): boolean {
  if (!currentValue && !previousValue) return false;
  if (!currentValue && previousValue) return true;
  if (currentValue && !previousValue) return true;
  if (areRowsDifferent(currentValue, previousValue)) return true;
  if (areColumnsDifferent(currentValue, previousValue)) return true;

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
        this.formGroup = this.formBuilder.of(currentValue);
      }
      this.formGroup.patchValue(changes.board.currentValue);
    }
  }
}
