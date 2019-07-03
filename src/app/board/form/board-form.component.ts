import { Component, OnInit, Input } from "@angular/core";
import { Board } from "src/app/shared/board/board.model";
import { BoardFormBuilderService } from "./board-form-builder.service";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-board-form",
  templateUrl: "./board-form.component.html",
  styleUrls: ["./board-form.component.scss"]
})
export class BoardFormComponent {
  @Input()
  board: Board;

  formGroup: FormGroup = this.formBuilder.initial();

  constructor(private formBuilder: BoardFormBuilderService) {}
}
