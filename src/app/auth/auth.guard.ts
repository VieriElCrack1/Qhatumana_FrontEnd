import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuth = authService.isLogueado();
  
  if(!isAuth) {
    router.navigate(["/auth"], { queryParams: { url: state.url } });
    return false;
  }

  return true;
};
