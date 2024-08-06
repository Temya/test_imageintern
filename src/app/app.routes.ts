import { Routes } from "@angular/router";
import { childRoutes } from "./cook-quiz/quiz.routes";

export const routes: Routes = [
  {
    path: "pictures",
    loadComponent: () => import("./images/main.component").then((i) => i.MainComponent),
  },
  {
    path: "game",
    loadComponent: () => import("./game-page/game-page.component").then((i) => i.GamePageComponent),
  },
  {
    path: "major",
    loadComponent: () => import("./cook-quiz/major/major.component").then((i) => i.MajorComponent),
    loadChildren: () =>
      import("./cook-quiz/quiz.routes").then(m => childRoutes),
  },
];
