import { Routes } from "@angular/router";
import { AuthorizationComponent } from "./authorization/authorization.component";
import { RegistrationComponent } from "./registration/registration.component";

export const childRoutes: Routes = [
  {
    path: "",
    component: AuthorizationComponent,
  },
  {
    path: "register",
    component: RegistrationComponent,
  },
];
