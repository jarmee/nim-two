import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { Board, Column, Columns } from "../../shared/board/board.model";
import { SubscriptionService } from "../../shared/subscription.service";
import { BoardFormBuilderService } from "./board-form-builder.service";

const PLAYER_FORM_CONTROL_NAME = "player";
const DEFAULT_PLAYER_NAME = "😎";
const DEFAULT_ERROR_CODE = "errorMessage";

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

export function watchColumnValueChangesOf(
  formGroup: FormGroup,
  colummWatcher: (column: Column, columnFormGroup: FormGroup) => void
): Subscription[] {
  return Object.values(formGroup.controls)
    .map((rowFormGroup: FormGroup) =>
      Object.values(rowFormGroup.controls).map((columnFormGroup: FormGroup) =>
        columnFormGroup.valueChanges.subscribe((column: Column) =>
          colummWatcher(column, columnFormGroup)
        )
      )
    )
    .reduce(
      (subscriptions: Subscription[], innerSubscriptions: Subscription[]) => [
        ...subscriptions,
        ...innerSubscriptions
      ],
      []
    );
}

export function andSetPlayerIfCheckedTo(playerName: string) {
  return (column: Column, columnFormGroup: FormGroup) =>
    columnFormGroup
      .get(PLAYER_FORM_CONTROL_NAME)
      .patchValue(!!column.value ? playerName : null, { emitEvent: false });
}

export function patchValueOf<T>(
  formGroup: FormGroup,
  value: T,
  afterPatchValue: (formGroup: FormGroup, value: T) => void
): void {
  formGroup.patchValue(value, { emitEvent: false });
  afterPatchValue(formGroup, value);
}

export function andSetErrors() {
  return (formGroup: FormGroup, value: Board) => {
    Object.keys(value).forEach((rowKey: string) => {
      const rowFormGroup = formGroup.get(rowKey) as FormGroup;
      Object.keys(value[rowKey]).forEach((columnKey: string) => {
        const columnFormGroup = rowFormGroup.get(columnKey);
        const { errorMessage }: Column = value[rowKey][columnKey];
        if (errorMessage) {
          columnFormGroup.setErrors({ errorMessage }, { emitEvent: false });
        }
      });
    });
  };
}

@Component({
  selector: "app-board-form",
  templateUrl: "./board-form.component.html",
  styleUrls: ["./board-form.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoardFormComponent extends SubscriptionService
  implements OnChanges, OnDestroy {
  @Input()
  board: Board;

  @Output()
  executePlay = new EventEmitter<Board>();

  @Output()
  reset = new EventEmitter<void>();

  formGroup: FormGroup = this.formBuilder.initial();

  constructor(private formBuilder: BoardFormBuilderService) {
    super();
  }

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

  columnFormGroup(
    formGroupName: string,
    columnFormGroupName: string
  ): FormGroup {
    const rowFormGroup = this.formGroup.get(formGroupName);
    return rowFormGroup.get(columnFormGroupName) as FormGroup;
  }

  playerName(formGroupName: string, columnFormGroupName: string): string {
    return (
      (this.columnFormGroup(formGroupName, columnFormGroupName).value as Column)
        .player || ""
    );
  }

  isColumnErrornous(
    formGroupName: string,
    columnFormGroupName: string
  ): boolean {
    return this.columnFormGroup(formGroupName, columnFormGroupName).hasError(
      DEFAULT_ERROR_CODE
    );
  }

  columnErrorMessage(
    formGroupName: string,
    columnFormGroupName: string
  ): string {
    return this.columnFormGroup(formGroupName, columnFormGroupName).getError(
      DEFAULT_ERROR_CODE
    );
  }

  onExecutePlay() {
    this.executePlay.emit(this.formGroup.value);
  }

  onReset() {
    this.reset.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.board) {
      const { currentValue, previousValue } = changes.board;
      this.board = currentValue;
      if (hasChanged(currentValue, previousValue)) {
        this.formGroup = this.formBuilder.of(currentValue);
        this.subscriptions = watchColumnValueChangesOf(
          this.formGroup,
          andSetPlayerIfCheckedTo(DEFAULT_PLAYER_NAME)
        );
      }
      patchValueOf<Board>(this.formGroup, currentValue, andSetErrors());
    }
  }
}
