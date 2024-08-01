import { Routes } from "@angular/router";
import { GamePageComponent } from "./components/game-page/game-page.component";
import { MainComponent } from "./components/main/main.component";
import { MajorComponent } from "./components/major/major.component";
import { AuthorizationComponent } from "./components/authorization/authorization.component";
import { RegistrationComponent } from "./components/registration/registration.component";

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
    children: [
      {
        path: "auth",
        component: AuthorizationComponent,
      },
      {
        path: "registr",
        component: RegistrationComponent,
      },
    ],
  },
];
