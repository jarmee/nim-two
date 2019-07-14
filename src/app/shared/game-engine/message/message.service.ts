import { Inject, Injectable, Optional } from "@angular/core";
import { Observable } from "rxjs";
import { map, withLatestFrom } from "rxjs/operators";
import { RuleService } from "../rule/rule.service";
import { GameState, GameStatus } from "../state/state.model";
import { StateService } from "../state/state.service";
import { Player } from "../turn/turn.model";
import { TurnService } from "../turn/turn.service";
import {
  defaultMessageProducer,
  GAME_MESSAGE_PRODUCER,
  MessageProducer
} from "./message.model";

@Injectable()
export class MessageService {
  messages$: Observable<string> = this.ruleService.rulesApplied$.pipe(
    withLatestFrom(this.stateService.status$, this.turnService.selectedPlayer$),
    map(([, status, player]: [GameState, GameStatus, Player]) =>
      this.messageProducer(status, player)
    )
  );
  constructor(
    private ruleService: RuleService,
    private stateService: StateService,
    private turnService: TurnService,
    @Optional()
    @Inject(GAME_MESSAGE_PRODUCER)
    private messageProducer: MessageProducer = defaultMessageProducer
  ) {}
}
