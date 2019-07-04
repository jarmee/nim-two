import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MatchControlComponent } from "./match-control.component";
import { Renderer, ElementRef, Renderer2, Type } from "@angular/core";
import * as faker from "faker";
import { By } from "@angular/platform-browser";

describe("MatchControlComponent", () => {
  let component: MatchControlComponent;
  let fixture: ComponentFixture<MatchControlComponent>;
  let renderer: Renderer2;
  let elementRef: ElementRef;
  let checkboxElementRef: ElementRef;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchControlComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchControlComponent);
    component = fixture.componentInstance;
    component.formControlName = "match-control";
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2 as Type<
      Renderer2
    >);
    elementRef = fixture.elementRef;
    checkboxElementRef = fixture.componentInstance.checkboxElementRef;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match the snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });

  describe("registerOnChange", () => {
    it("should set the onChangeCallback", () => {
      const fakeCallback = jest.fn();
      component.registerOnChange(fakeCallback);

      expect(component.onChangeCallback).toBe(fakeCallback);
    });
  });

  describe("registerOnTouched", () => {
    it("should set the onTouchedCallback", () => {
      const fakeCallback = jest.fn();
      component.registerOnTouched(fakeCallback);

      expect(component.onTouchedCallback).toBe(fakeCallback);
    });
  });

  describe("writeValue", () => {
    it("should set the ckecked property of the elementRef", () => {
      const value = faker.random.boolean();
      renderer.setProperty = jest.fn();

      component.writeValue(value);

      expect((renderer.setProperty as jest.Mock).mock.calls[0]).toEqual([
        elementRef,
        "checked",
        value
      ]);

      expect((renderer.setProperty as jest.Mock).mock.calls[1]).toEqual([
        checkboxElementRef.nativeElement,
        "disabled",
        value
      ]);

      (renderer.setProperty as jest.Mock).mockClear();
    });
  });

  describe("onChange", () => {
    it("should call the onChangeCallback function", () => {
      const value = faker.random.boolean();
      component.onChangeCallback = jest.fn();

      component.onChange(value);

      expect(component.onChangeCallback).toHaveBeenCalledWith(value);
    });

    it("should call the onChange event handler if the checkbox changed", () => {
      const checked = faker.random.boolean();
      const checkboxElement = fixture.debugElement.query(
        By.css("[data-test-id='match-checkbox']")
      );
      component.onChange = jest.fn();

      checkboxElement.triggerEventHandler("change", {
        target: {
          checked
        }
      });

      expect(component.onChange).toHaveBeenCalledWith(checked);
    });
  });

  describe("onTouched", () => {
    it("should call the onTouchedCallback function", () => {
      component.onTouchedCallback = jest.fn();

      component.onTouched();

      expect(component.onTouchedCallback).toHaveBeenCalledWith();
    });

    it("should call the onTouched event handler if the checkbox gets blured", () => {
      const checkboxElement = fixture.debugElement.query(
        By.css("[data-test-id='match-checkbox']")
      );
      component.onTouched = jest.fn();

      checkboxElement.triggerEventHandler("blur", {});

      expect(component.onTouched).toHaveBeenCalled();
    });
  });
});
