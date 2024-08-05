import { Routes } from "@angular/router";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { RegistrationComponent } from "./registration/registration.component";
import { authorizationGuard } from "../core/auth/authorization.guard";
import { MainMenuComponent } from "./main-menu/main-menu.component";

export const childRoutes: Routes = [
  {
    path: "",
    component: AuthorizationComponent,
    canActivate: [authorizationGuard]
  },
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [authorizationGuard]
  },
  {
    path: "menu",
    component: MainMenuComponent,
    canActivate: [authorizationGuard]
  },
];
