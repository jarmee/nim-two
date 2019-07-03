import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board.component";
import { BoardFormComponent } from "./form/board-form.component";
import { BoardFormBuilderService } from "./form/board-form-builder.service";

@NgModule({
  declarations: [BoardComponent, BoardFormComponent],
  imports: [CommonModule],
  exports: [BoardComponent],
  providers: [BoardFormBuilderService]
})
export class BoardModule {}
