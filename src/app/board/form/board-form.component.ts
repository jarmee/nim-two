import { Component, OnInit, Input } from "@angular/core";
import { Board } from "src/app/shared/board/board.model";

@Component({
  selector: "app-board-form",
  templateUrl: "./board-form.component.html",
  styleUrls: ["./board-form.component.scss"]
})
export class BoardFormComponent {
  @Input()
  board: Board;
}
