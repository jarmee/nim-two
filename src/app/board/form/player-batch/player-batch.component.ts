import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-player-batch',
  templateUrl: './player-batch.component.html',
  styleUrls: ['./player-batch.component.scss']
})
export class PlayerBatchComponent {
  @Input()
  name: string;

  get shouldBeVisible(): boolean {
    return !!this.name;
  }
}
