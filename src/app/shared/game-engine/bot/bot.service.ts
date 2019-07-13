import { Inject, Injectable, Optional } from "@angular/core";
import { delay, filter, map, tap, withLatestFrom } from "rxjs/operators";
import { SubscriptionService } from "../../state/subscription.service";
import { GameState } from "../game-engine.model";
import { GameEngineService } from "../game-engine.service";
import { Player, PlayerType } from "../turn/turn.model";
import { TurnService } from "../turn/turn.service";
import { calculateState } from "./bot.helpers";
import { AiRules, GAME_AI_RULES } from "./bot.model";

@Injectable()
export class BotService extends SubscriptionService {
  constructor(
    private turnService: TurnService,
    private gameEngineService: GameEngineService,
    @Optional() @Inject(GAME_AI_RULES) private aiRules: AiRules = []
  ) {
    super();
    this.subscribeTo(
      this.turnService.selectedPlayer$.pipe(
        filter((player: Player) => player.type == PlayerType.Artificial),
        withLatestFrom(this.gameEngineService.state$),
        map(([player, state]: [Player, GameState]) => state),
        delay(1000),
        map((state: GameState) =>
          calculateState(this.aiRules)(Object.freeze(state))
        ),
        tap((newState: GameState) => {
          this.gameEngineService.executePlay(newState.board);
        })
      )
    );
  }
}
