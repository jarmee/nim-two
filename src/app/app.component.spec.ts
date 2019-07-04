import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { BoardModule } from "./board/board.module";
import { BoardFormBuilderService } from "./board/form/board-form-builder.service";
import { GameState } from "./shared/game-engine/game-engine.model";
import { GameEngineModule } from "./shared/game-engine/game-engine.module";
import { gameStateFactory } from "./shared/game-engine/testing/game-engine.mock";

describe("AppComponent", () => {
  const initialGameState: GameState = gameStateFactory.build();
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [BoardModule, GameEngineModule.forRoot(initialGameState)],
      providers: [BoardFormBuilderService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  });

  it("should create the app", () => {
    expect(component).toBeTruthy();
  });

  it("should match the snapshot", () => {
    expect(fixture).toMatchSnapshot();
  });
});
