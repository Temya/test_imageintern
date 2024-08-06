import { Routes } from "@angular/router";
import { AuthorizationComponent } from "./major/authorization/authorization.component";
import { RegistrationComponent } from "./major/registration/registration.component";
import { authorizationGuard } from "../core/auth/authorization.guard";
import { MainMenuComponent } from "./major/main-menu/main-menu.component";
import { NewGameComponent } from "./major/main-menu/new-game/new-game.component";
import { AchievementsComponent } from "./major/main-menu/achievements/achievements.component";
import { SettingsComponent } from "./major/main-menu/settings/settings.component";

export const childRoutes: Routes = [
  {
    path: "",
    component: AuthorizationComponent,
    canActivate: [authorizationGuard],
    data: { redirectIfAuth: true },
  },
  {
    path: "register",
    component: RegistrationComponent,
    canActivate: [authorizationGuard],
    data: { redirectIfAuth: true },
  },
  {
    path: "menu",
    component: MainMenuComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: "game",
    component: NewGameComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: "achivements",
    component: AchievementsComponent,
    canActivate: [authorizationGuard],
  },
  {
    path: "settings",
    component: SettingsComponent,
    canActivate: [authorizationGuard],
  },
];
