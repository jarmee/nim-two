import { Inject, Injectable } from "@angular/core";
import { PLAYERS, Players } from "./turn.model";

@Injectable()
export class TurnService {
  constructor(@Inject(PLAYERS) private players: Players) {}
}
