import { TestBed } from "@angular/core/testing";
import * as faker from "faker";
import { BoardBuilder } from "../board/board.builder";
import { Board, BoardDifferences } from "../board/board.model";
import { boardFactory } from "../board/testing/board.mock";
import { GameState, GameStatus, GAME_STATE_STORE } from "./game-engine.model";
import { checkRules, diff, GameEngineService } from "./game-engine.service";
import { GameEngineStore } from "./game-engine.store";
import { gameStateFactory } from "./testing/game-engine.mock";

describe("GameEngineService", () => {
  const initialGameState: GameState = gameStateFactory.build();

  let service: GameEngineService;
  let store: GameEngineStore;

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        GameEngineService,
        {
          provide: GAME_STATE_STORE,
          useFactory: () => new GameEngineStore(initialGameState)
        }
      ]
    })
  );

  beforeEach(() => {
    service = TestBed.get(GameEngineService);
    store = TestBed.get(GAME_STATE_STORE);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  describe("executePlay", () => {
    beforeEach(() => {
      store.next = jest.fn();
    });

    it("should call the next method of the store", () => {
      const expectedBoard = boardFactory();

      service.executePlay(expectedBoard);

      expect(store.next).toHaveBeenCalledWith({
        status: GameStatus.InProgress,
        board: expectedBoard
      });
    });

    afterEach(() => {
      (store.next as jest.Mock).mockClear();
    });
  });

  describe("amount$", () => {
    it("should emit the current amount", done => {
      service.amount$.subscribe((actualAmount: number) => {
        expect(actualAmount).toBe(13);
        done();
      });
    });
  });

  describe("board$", () => {
    it("should emit the current board", done => {
      service.board$.subscribe((actualBoard: Board) => {
        expect(actualBoard).toBe(store.snapshot.board);
        done();
      });
    });
  });

  describe("status$", () => {
    it("should emit the current game status", done => {
      service.status$.subscribe((actualStatus: GameStatus) => {
        expect(actualStatus).toBe(store.snapshot.status);
        done();
      });
    });
  });

  describe("gameLoop$", () => {
    //TODO: Add missing test
  });

  describe("diff", () => {
    it("should return an empty array if both Board objects have the same values", () => {
      const newBoard: Board = BoardBuilder.create()
        .addRowWithColumns(false)
        .build();

      const currentBoard: Board = BoardBuilder.create()
        .addRowWithColumns(false)
        .build();

      const actual = diff(newBoard, currentBoard);

      expect(actual).toEqual([]);
    });

    it("should return an emptry array if one of the parameter is null", () => {
      const newBoard = BoardBuilder.create()
        .addRowWithColumns(true)
        .build();
      const currentBoard = null;

      const actual = diff(newBoard, currentBoard);

      expect(actual).toEqual([]);
    });

    it("should return an array which contains all the columns that are not equal", () => {
      const newColumn = {
        value: false,
        player: faker.name.firstName()
      };
      const newBoard: Board = {
        0: {
          0: newColumn
        }
      };
      const currentColumn = {
        value: true,
        player: faker.name.firstName()
      };
      const currentBoard: Board = {
        0: {
          0: currentColumn
        }
      };

      const actual = diff(newBoard, currentBoard);

      expect(actual).toEqual([{ newColumn, currentColumn, path: ["0", "0"] }]);
    });
  });

  describe("checkRules", () => {
    const newState: GameState = gameStateFactory
      .extend({
        board: BoardBuilder.create()
          .addRowWithColumns(true)
          .build()
      })
      .build();
    const actualState: GameState = gameStateFactory
      .extend({
        board: BoardBuilder.create()
          .addRowWithColumns(false)
          .build()
      })
      .build();
    const boardDifferences: BoardDifferences = [
      {
        newColumn: newState.board[0][0],
        currentColumn: actualState.board[0][0],
        path: ["0", "0"]
      }
    ];

    it("should return the provided newState if no rules are given", () => {
      const actual = checkRules([])(newState, actualState, boardDifferences);

      expect(actual).toEqual(newState);
    });

    it("should call the provided rule", () => {
      const rule = jest.fn().mockReturnValue(state => newState);

      const actual = checkRules([rule])(
        newState,
        actualState,
        boardDifferences
      );

      expect(actual).toEqual(newState);
      expect(rule).toHaveBeenCalledWith(
        newState,
        actualState,
        boardDifferences
      );
    });
  });
});
