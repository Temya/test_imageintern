import { HttpInterceptorFn } from '@angular/common/http';

export const loginInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem('token')) {
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
