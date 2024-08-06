import { HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { BackendService } from "../../../shared/backend.service";

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(BackendService);
  if (req.withCredentials && authService.auth.getToken()) {
    const reqWithToken = req.clone({
      headers: req.headers.set(
        "Autorization",
        `${localStorage.getItem("token")}`
      ),
    });
    return next(reqWithToken);
  }
  return next(req);
};
