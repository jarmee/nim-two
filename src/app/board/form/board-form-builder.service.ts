import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Board, Columns } from "src/app/shared/board/board.model";

const initalFormGroup = new FormGroup({});

function createFormGroupForRow(columns: Columns): FormGroup {
  return Object.keys(columns).reduce((rowFormGroup: FormGroup, columnKey) => {
    const { value, player } = columns[columnKey];
    rowFormGroup.addControl(
      columnKey,
      new FormGroup({
        value: new FormControl(value),
        player: new FormControl(player)
      })
    );
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
