import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { GameState } from "./game-engine.model";

export class GameEngineStore extends BehaviorSubject<GameState> {
  snapshot: GameState;

  constructor(gameState: GameState) {
    super(gameState);
    this.snapshot = gameState;
  }

  next(partialState: Partial<GameState>) {
    const newState = {
      ...this.snapshot,
      ...partialState
    };
    this.snapshot = newState;
    super.next(newState);
  }
}
