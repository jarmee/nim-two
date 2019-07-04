import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BoardComponent } from "./board.component";
import { BoardFormComponent } from "./form/board-form.component";
import { BoardFormBuilderService } from "./form/board-form-builder.service";
import { ReactiveFormsModule } from "@angular/forms";
import { MatchControlComponent } from './form/match-control/match-control.component';

@NgModule({
  declarations: [BoardComponent, BoardFormComponent, MatchControlComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [BoardComponent],
  providers: [BoardFormBuilderService]
})
export class BoardModule {}
