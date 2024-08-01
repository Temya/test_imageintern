import { Routes } from "@angular/router";
import { GamePageComponent } from "./components/game-page/game-page.component";
import { MainComponent } from "./components/main/main.component";
import { MajorComponent } from "./cook-quiz/major/major.component";
import { childRoutes } from "./cook-quiz/routes";

export const routes: Routes = [
  {
    path: "pictures",
    component: MainComponent,
  },
  {
    path: "game",
    component: GamePageComponent,
  },
  {
    path: "major",
    component: MajorComponent,
    loadChildren: () => 
      import('./cook-quiz/routes').then((m) =>  childRoutes)
  },
];
