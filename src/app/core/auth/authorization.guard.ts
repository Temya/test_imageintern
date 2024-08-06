import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const redirectIfAuth = route.data?.["redirectIfAuth"];
  if (redirectIfAuth && authService.isAuth) {
    router.navigate(["/major/menu"]);
    return true;
  } else if (redirectIfAuth) return true;
  if (!authService.isAuth && !redirectIfAuth) {
    router.navigate(["/major"]);
    return true;
  }
  return authService.isAuth;
};
