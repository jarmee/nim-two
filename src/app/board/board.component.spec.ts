import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardComponent } from "./board.component";
import { By } from "@angular/platform-browser";

describe("BoardComponent", () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match the snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });

  describe("onExecutePlay", () => {
    describe("", () => {
      it("should call the onExecutePlay event handler on click", () => {
        const spyOnOnExecutePlay = jest.spyOn(component, "onExecutePlay");
        const buttonElement = fixture.debugElement.query(
          By.css("[data-test-id='execute-play-one']")
        );

        buttonElement.triggerEventHandler("click", {});

        expect(spyOnOnExecutePlay).toHaveBeenCalledWith(1);
      });
    });
  });
});
