import { Inject, Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import {
  countColumnsOf,
  withColumnValueFalseFilter
} from "../board/board.helpers";
import { Board } from "../board/board.model";
import { SubscriptionService } from "../state/subscription.service";
import { GameState, GameStatus, GAME_STATE_STORE } from "./game-engine.model";
import { GameEngineStore } from "./game-engine.store";
import { RuleService } from "./rule/rule.service";
import { TurnService } from "./turn/turn.service";

@Injectable()
export class GameEngineService extends SubscriptionService
  implements OnDestroy {
  gameLoop$: BehaviorSubject<Partial<GameState>> = new BehaviorSubject<
    Partial<GameState>
  >(null);

  state$: Observable<GameState> = this.store;

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
    @Inject(GAME_STATE_STORE) private store: GameEngineStore,
    private turnService: TurnService,
    private ruleService: RuleService
  ) {
    super();
    this.subscribeTo(
      this.ruleService.rulesApplied$.pipe(
        tap((newState: GameState) => this.store.next(newState)),
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
    this.store.reset();
  }
}
