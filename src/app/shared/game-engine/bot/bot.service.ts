import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, filter, map, tap, withLatestFrom } from 'rxjs/operators';
import { SubscriptionService } from '../../state/subscription.service';
import { RuleService } from '../rule/rule.service';
import { GameState } from '../state/state.model';
import { StateService } from '../state/state.service';
import { Player, PlayerType } from '../turn/turn.model';
import { TurnService } from '../turn/turn.service';
import { calculateState } from './bot.helpers';
import { AiRules, GAME_AI_RULES } from './bot.model';

@Injectable()
export class BotService extends SubscriptionService {
  calculateState$: Observable<GameState> = this.turnService.selectedPlayer$.pipe(
    filter((player: Player) => player.type === PlayerType.Artificial),
    withLatestFrom(this.stateService.state$),
    map(([player, state]: [Player, GameState]) => state),
    delay(1000),
    map((state: GameState) => calculateState(this.aiRules)(Object.freeze(state))),
    tap((newState: GameState) => {
      this.ruleService.applyRules(newState);
    })
  );

  constructor(
    private turnService: TurnService,
    private stateService: StateService,
    private ruleService: RuleService,
    @Optional() @Inject(GAME_AI_RULES) private aiRules: AiRules = []
  ) {
    super();
    this.subscribeTo(this.calculateState$);
  }
}
