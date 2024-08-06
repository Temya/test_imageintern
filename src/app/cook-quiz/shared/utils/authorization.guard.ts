import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { BackendService } from "../../../shared/backend.service";

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(BackendService);
  const router = inject(Router);
  const redirectIfAuth = route.data?.["redirectIfAuth"];
  if (redirectIfAuth && authService.auth.isAuth) {
    router.navigate(["/major/menu"]);
    return true;
  } else if (redirectIfAuth) return true;
  if (!authService.auth.isAuth && !redirectIfAuth) {
    router.navigate(["/major"]);
    return false;
  }
  return authService.auth.isAuth;
};
