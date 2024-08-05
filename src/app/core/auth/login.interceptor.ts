import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if(req.withCredentials && authService.getToken()) {
    const reqWithToken = req.clone({
      headers: req.headers.set(
        'Autorization',
        `${localStorage.getItem('token')}`
      )
    });
    return next(reqWithToken)
  }
  return next(req);
};
