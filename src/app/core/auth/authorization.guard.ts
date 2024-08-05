import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "./auth.service";

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const redirectIfAuth = route.data?.["redirectIfAuth"];
  if (redirectIfAuth && authService.isAuth) {
    router.navigate([" "]);
    return false;
  } else if (redirectIfAuth) return true;
  if (!authService.isAuth && !redirectIfAuth) {
    router.navigate(["/auth"]);
    return false;
  }

  return authService.isAuth;
};
