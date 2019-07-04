import { BoardBuilder } from "./board.builder";
import { Board } from "./board.model";

describe("BoardBuilder", () => {
  describe("create", () => {
    it("should return a BoardBuilder object", () => {
      const actual = BoardBuilder.create();

      expect(actual instanceof BoardBuilder).toBe(true);
      expect(actual).not.toBeNull();
    });
  });

  describe("build", () => {
    it("should return a Board object", () => {
      const actual = BoardBuilder.create().build();

      expect(actual).not.toBeNull();
    });
  });

  describe("addRow", () => {
    it("should add a row", () => {
      const actual = BoardBuilder.create()
        .addRowWithColumns()
        .build();

      expect(Object.keys(actual)).toEqual(["0"]);
    });

    it("should add multiple rows", () => {
      const actual = BoardBuilder.create()
        .addRowWithColumns()
        .addRowWithColumns()
        .addRowWithColumns()
        .addRowWithColumns()
        .addRowWithColumns()
        .build();

      expect(Object.keys(actual)).toStrictEqual(["0", "1", "2", "3", "4"]);
    });

    it("should a column per given boolean parameter", () => {
      const actual = BoardBuilder.create()
        .addRowWithColumns(true, false, true, false)
        .build();
      const row = actual[0];

      expect(Object.keys(row)).toStrictEqual(["0", "1", "2", "3"]);
      expect(Object.values(row)).toStrictEqual([
        { value: true, player: null },
        { value: false, player: null },
        { value: true, player: null },
        { value: false, player: null }
      ]);
    });
  });
});
