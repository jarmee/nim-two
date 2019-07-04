import {
  Component,
  OnInit,
  Renderer,
  ElementRef,
  forwardRef,
  Renderer2,
  Input,
  ViewChild
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
import { templateJitUrl } from "@angular/compiler";

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

  @ViewChild("matchCheckbox", { static: true })
  checkboxElementRef: ElementRef;

  onChangeCallback: (value: boolean) => void;

  onTouchedCallback: () => void;

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
