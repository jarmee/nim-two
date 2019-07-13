import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { SubscriptionService } from "../state/subscription.service";
import {
  countColumnsOf,
  withColumnValueFalseFilter
} from "./board/board.helpers";
import { Board } from "./board/board.model";
import { BotService } from "./bot/bot.service";
import { RuleService } from "./rule/rule.service";
import { GameState, GameStatus } from "./state/state.model";
import { StateService } from "./state/state.service";
import { TurnService } from "./turn/turn.service";

@Injectable()
export class GameEngineFacade extends SubscriptionService implements OnDestroy {
  gameLoop$: BehaviorSubject<Partial<GameState>> = new BehaviorSubject<
    Partial<GameState>
  >(null);

  state$: Observable<GameState> = this.stateService.state$;

  amount$: Observable<number> = this.state$.pipe(
    map((state: GameState) => state.board),
    map((board: Board) => countColumnsOf(board, withColumnValueFalseFilter))
  );

  board$: Observable<Board> = this.state$.pipe(
    map((state: GameState) => state.board)
  );

  status$: Observable<GameStatus> = this.state$.pipe(
    map((state: GameState) => state.status)
  );

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
          if (newState.status !== GameStatus.Errornous) {
            this.turnService.switchPlayer();
          }
        })
      )
    );
  }

  executePlay(newBoardState: Board) {
    this.ruleService.applyRules({
      board: newBoardState
    });
  }

  reset() {
    this.stateService.resetState();
  }
}
