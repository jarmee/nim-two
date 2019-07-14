import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { SubscriptionService } from "../state/subscription.service";
import { Board } from "./board/board.model";
import { BotService } from "./bot/bot.service";
import { RuleService } from "./rule/rule.service";
import { GameState, GameStatus } from "./state/state.model";
import { StateService } from "./state/state.service";
import { Player } from "./turn/turn.model";
import { TurnService } from "./turn/turn.service";

@Injectable()
export class GameEngineFacade extends SubscriptionService implements OnDestroy {
  gameLoop$: BehaviorSubject<Partial<GameState>> = new BehaviorSubject<
    Partial<GameState>
  >(null);

  state$: Observable<GameState> = this.stateService.state$;

  amount$: Observable<number> = this.stateService.amount$;

  board$: Observable<Board> = this.stateService.board$;

  status$: Observable<GameStatus> = this.stateService.status$;

  selectedPlayer$: Observable<Player> = this.turnService.selectedPlayer$;

  constructor(
    private turnService: TurnService,
    private ruleService: RuleService,
    private stateService: StateService,
    private botService: BotService
  ) {
    super();
    this.subscribeTo(
      this.ruleService.rulesApplied$.pipe(
        tap((newState: GameState) => this.stateService.updateState(newState)),
        tap((newState: GameState) => {
          if (newState.status === GameStatus.Valid) {
            this.turnService.switchPlayer();
          }
        })
      )
    );
  }

  executePlay(newBoardState: Board) {
    this.ruleService.applyRules({
      status: GameStatus.Valid,
      board: newBoardState
    });
  }

  reset() {
    this.stateService.resetState();
  }
}
