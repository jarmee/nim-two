import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import * as faker from "faker";
import { PlayerBatchComponent } from "./player-batch.component";

describe("PlayerBatchComponent", () => {
  let component: PlayerBatchComponent;
  let fixture: ComponentFixture<PlayerBatchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayerBatchComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("shouldBeVisible", () => {
    it("should return true if the name is set", () => {
      component.name = faker.random.word();

      expect(component.shouldBeVisible).toBe(true);
    });

    it("should return false if the name is not set", () => {
      component.name = null;

      expect(component.shouldBeVisible).toBe(false);
    });
  });
});
