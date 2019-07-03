import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board.component";
import { BoardFormComponent } from "./form/board-form.component";

@NgModule({
  declarations: [BoardComponent, BoardFormComponent],
  imports: [CommonModule],
  exports: [BoardComponent]
})
export class BoardModule {}
