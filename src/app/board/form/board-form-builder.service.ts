import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Board, Columns } from "../../shared/game-engine/board/board.model";

const initalFormGroup = new FormGroup({});

function createFormGroupForRow(columns: Columns): FormGroup {
  return Object.keys(columns).reduce((rowFormGroup: FormGroup, columnKey) => {
    const { value, player, errorMessage } = columns[columnKey];
    const columnFormGroup = new FormGroup({
      value: new FormControl(value),
      player: new FormControl(player)
    });
    if (errorMessage) {
      columnFormGroup.setErrors(errorMessage, { emitEvent: false });
    }
    rowFormGroup.addControl(columnKey, columnFormGroup);
    return rowFormGroup;
  }, new FormGroup({}));
}

function createFormGroupForBoard(board: Board): FormGroup {
  if (!board) return initalFormGroup;
  return Object.keys(board).reduce((formGroup: FormGroup, rowKey: string) => {
    formGroup.addControl(rowKey, createFormGroupForRow(board[rowKey]));
    return formGroup;
  }, new FormGroup({}));
}

@Injectable()
export class BoardFormBuilderService {
  of(board: Board): FormGroup {
    return createFormGroupForBoard(board);
  }

  initial(): FormGroup {
    return initalFormGroup;
  }
}
