import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BoardFormComponent } from "./board-form.component";
import { BoardFormBuilderService } from "./board-form-builder.service";

describe("BoardFormComponent", () => {
  let component: BoardFormComponent;
  let fixture: ComponentFixture<BoardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BoardFormComponent],
      providers: [BoardFormBuilderService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should match the snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });
});
