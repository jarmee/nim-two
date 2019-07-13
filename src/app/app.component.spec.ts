import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { BoardModule } from "./board/board.module";
import { BoardFormBuilderService } from "./board/form/board-form-builder.service";
import { GameEngineModule } from "./shared/game-engine/game-engine.module";
import {
  playerFactory,
  PlayerType
} from "./shared/game-engine/turn/turn.model";
import { NIM_KI_RULES } from "./shared/rules/nim/nim.ai";
import { NIM_BOARD } from "./shared/rules/nim/nim.board";
import { NIM_GAME_RULES } from "./shared/rules/nim/nim.rules";

describe("AppComponent", () => {
  const PLAYERS = [
    playerFactory("😎", PlayerType.Human),
    playerFactory("🤖", PlayerType.Artificial)
  ];
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        BoardModule,
        GameEngineModule.forRoot(
          NIM_BOARD,
          PLAYERS,
          NIM_GAME_RULES,
          NIM_KI_RULES
        )
      ],
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
