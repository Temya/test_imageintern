import { Routes } from "@angular/router";
import { authorizationGuard } from "./shared/utils/authorization.guard";

export const childRoutes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./major/authorization/authorization.component").then(
        i => i.AuthorizationComponent
      ),
    canActivate: [authorizationGuard],
    data: { redirectIfAuth: true },
  },
  {
    path: "register",
    loadComponent: () =>
      import("./major/registration/registration.component").then(
        i => i.RegistrationComponent
      ),
    canActivate: [authorizationGuard],
    data: { redirectIfAuth: true },
  },
  {
    path: "menu",
    loadComponent: () =>
      import("./major/main-menu/main-menu.component").then(
        i => i.MainMenuComponent
      ),
    canActivate: [authorizationGuard],
  },
  {
    path: "game",
    loadComponent: () =>
      import("./major/new-game/new-game.component").then(
        i => i.NewGameComponent
      ),
    canActivate: [authorizationGuard],
  },
  {
    path: "achivements",
    loadComponent: () =>
      import("./major/achievements/achievements.component").then(
        i => i.AchievementsComponent
      ),
    canActivate: [authorizationGuard],
  },
  {
    path: "settings",
    loadComponent: () =>
      import("./major/settings/settings.component").then(
        i => i.SettingsComponent
      ),
    canActivate: [authorizationGuard],
  },
];
