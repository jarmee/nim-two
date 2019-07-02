import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board.component";

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule],
  exports: [BoardComponent]
})
export class BoardModule {}
