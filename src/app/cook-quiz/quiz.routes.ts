import { Routes } from "@angular/router";
import { AuthorizationComponent } from "./major/authorization/authorization.component";
import { RegistrationComponent } from "./major/registration/registration.component";
import { authorizationGuard } from "../core/auth/authorization.guard";
import { MainMenuComponent } from "./major/main-menu/main-menu.component";
import { childGameRoutes } from "./major/main-menu/game.routes";

export const childRoutes: Routes = [
  {
    path: "",
    component: AuthorizationComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: "menu",
    component: MainMenuComponent,
    canActivate: [authorizationGuard],
    loadChildren: () => import("./major/main-menu/game.routes").then(m => childGameRoutes),
  },
];
