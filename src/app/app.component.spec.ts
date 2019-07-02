import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { BoardModule } from "./board/board.module";
import { GameEngineModule } from "./shared/game-engine/game-engine.module";
import { gameStateFactory } from "./shared/game-engine/testing/game-engine.mock";
import { GameState } from "./shared/game-engine/game-engine.model";

describe("AppComponent", () => {
  const initialGameState: GameState = gameStateFactory.build();
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [BoardModule, GameEngineModule.forRoot(initialGameState)]
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
