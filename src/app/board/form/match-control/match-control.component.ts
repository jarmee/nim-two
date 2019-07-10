import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
  ViewChild
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "app-match-control",
  templateUrl: "./match-control.component.html",
  styleUrls: ["./match-control.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatchControlComponent),
      multi: true
    }
  ]
})
export class MatchControlComponent implements ControlValueAccessor {
  @Input()
  formControlName: string;

  @Input()
  id: string;

  @ViewChild("matchCheckbox", { static: true })
  checkboxElementRef: ElementRef;

  onChangeCallback: (value: boolean) => void;

  onTouchedCallback: () => void;

  get uniqueFormControlId() {
    return `${this.formControlName}-${this.id}`
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  writeValue(value: boolean): void {
    this.renderer.setProperty(
      this.checkboxElementRef.nativeElement,
      "checked",
      value
    );
    this.renderer.setProperty(
      this.checkboxElementRef.nativeElement,
      "disabled",
      value
    );
  }

  registerOnChange(callback: (value: boolean) => void): void {
    this.onChangeCallback = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouchedCallback = callback;
  }

  onChange(value: boolean) {
    this.onChangeCallback(value);
  }

  onTouched() {
    this.onTouchedCallback();
  }
}
