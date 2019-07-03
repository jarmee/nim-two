import { Component, OnInit, Input } from "@angular/core";
import { Board } from "src/app/shared/board/board.model";
import { BoardFormBuilderService } from "./board-form-builder.service";

@Component({
  selector: "app-board-form",
  templateUrl: "./board-form.component.html",
  styleUrls: ["./board-form.component.scss"]
})
export class BoardFormComponent {
  @Input()
  board: Board;

  constructor(private formBuilder: BoardFormBuilderService) {}
}
