import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

@Injectable()
export class BoardFormBuilderService {
  constructor(private formBuilder: FormBuilder) {}

  initial(): FormGroup {
    return this.formBuilder.group({});
  }
}
