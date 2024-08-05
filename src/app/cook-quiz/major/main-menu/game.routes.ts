import { Routes } from "@angular/router";
import { NewGameComponent } from "./new-game/new-game.component";
import { authorizationGuard } from "../../../core/auth/authorization.guard";
import { AchievementsComponent } from "./achievements/achievements.component";
import { SettingsComponent } from "./settings/settings.component";

export const childGameRoutes: Routes = [
 {
    path: "game",
    component: NewGameComponent,
    canActivate: [authorizationGuard]
 },
 {
    path: "achivements",
    component: AchievementsComponent,
    canActivate: [authorizationGuard]
 },
 {
    path: "settings",
    component: SettingsComponent,
    canActivate: [authorizationGuard]
 }
];
