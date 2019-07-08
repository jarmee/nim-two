import { TestBed } from "@angular/core/testing";
import * as faker from "faker";
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

  describe("diff", () => {
    it("should return an empty array if both Board objects have the same values", () => {
      const newBoard: Board = {
        0: {
          0: {
            value: false,
            player: faker.name.firstName()
          }
        }
      };

      const currentBoard: Board = {
        0: {
          0: {
            value: false,
            player: faker.name.firstName()
          }
        }
      };

      const actual = diff(newBoard, currentBoard);

      expect(actual).toEqual([]);
    });

    it("should return an emptry array if one of the parameter is null", () => {
      const newBoard = {
        0: {
          0: {
            value: true,
            player: faker.name.firstName()
          }
        }
      };
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
    const boardDifferences: BoardDifferences = [
      {
        newColumn,
        currentColumn,
        path: ["0", "0"]
      }
    ];

    it("should return the provided newBoard if no rules are given", () => {
      const actual = checkRules([])(newBoard, currentBoard, boardDifferences);

      expect(actual).toEqual(newBoard);
    });

    it("should call the provided rule", () => {
      const rule = jest.fn().mockReturnValue(state => newBoard);

      const actual = checkRules([rule])(
        newBoard,
        currentBoard,
        boardDifferences
      );

      expect(actual).toEqual(newBoard);
      expect(rule).toHaveBeenCalledWith(
        newBoard,
        currentBoard,
        boardDifferences
      );
    });
  });
});
