import { Routes } from "@angular/router";
import { GamePageComponent } from "./components/game-page/game-page.component";
import { MainComponent } from "./components/main/main.component";
import { NavigateComponent } from "./components/navigate/navigate.component";

export const routes: Routes = [
  {
    path: "", component: NavigateComponent
  },
  {
    path: "pictures",
    component: MainComponent,
  },
  {
    path: "game",
    component: GamePageComponent
  },
];
