import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { Board, Columns } from "src/app/shared/board/board.model";

function createFormGroupForRow(columns: Columns): FormGroup {
  return Object.keys(columns).reduce((rowFormGroup: FormGroup, columnKey) => {
    rowFormGroup.addControl(columnKey, new FormControl(columns[columnKey]));
    return rowFormGroup;
  }, new FormGroup({}));
}

function createFormGroupForBoard(board: Board): FormGroup {
  return Object.keys(board).reduce((formGroup: FormGroup, rowKey: string) => {
    formGroup.addControl(rowKey, createFormGroupForRow(board[rowKey]));
    return formGroup;
  }, new FormGroup({}));
}

@Injectable()
export class BoardFormBuilderService {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  of(board: Board): FormGroup {
    return createFormGroupForBoard(board);
  }

  initial(): FormGroup {
    return this.formBuilder.group({});
  }
}
