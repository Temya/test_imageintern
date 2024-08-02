import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { BackendService } from '../../services/backend.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(BackendService)
  return authService.isAuth();
};
