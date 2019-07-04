import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  Output,
  OnDestroy,
  EventEmitter
} from "@angular/core";
import { Board, Columns, Column } from "src/app/shared/board/board.model";
import { BoardFormBuilderService } from "./board-form-builder.service";
import { FormGroup } from "@angular/forms";
import { Observable, Subscription, EMPTY } from "rxjs";

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

  @Output()
  executePlay = new EventEmitter<Board>();

  formGroup: FormGroup = this.formBuilder.initial();

  constructor(private formBuilder: BoardFormBuilderService) {}

  get formGroupControlNames(): string[] {
    return Object.keys(this.formGroup.controls);
  }

  get hasControls(): boolean {
    return this.formGroupControlNames.length > 0;
  }

  columnFormGroupControlNamesOf(formGroupName: string): string[] {
    const rowFormGroup = this.formGroup.get(formGroupName) as FormGroup;
    if (!rowFormGroup) return [];
    return Object.keys(rowFormGroup.controls);
  }

  playerName(formGroupName: string, columnFormGroupName: string) {
    const rowFormGroup = this.formGroup.get(formGroupName);
    const columnFormGroup = rowFormGroup.get(columnFormGroupName);
    return (columnFormGroup.value as Column).player || "";
  }

  onExecutePlay() {
    this.executePlay.emit(this.formGroup.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.board) {
      const { currentValue, previousValue } = changes.board;
      this.board = currentValue;
      if (hasChanged(currentValue, previousValue)) {
        this.formGroup = this.formBuilder.of(currentValue);
      }
      this.formGroup.patchValue(changes.board.currentValue || {}, {
        emitEvent: false
      });
    }
  }
}
