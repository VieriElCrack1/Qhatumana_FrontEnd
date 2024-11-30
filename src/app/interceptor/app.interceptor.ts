import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  const token = localStorage.getItem('token');

  let authRequest = req;

  if (token) {
    authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
          return authService.refreshToken().pipe(

            switchMap((newTokens: any) => {
  
                authRequest = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newTokens.jwt}`
                  }
                });
              
                return next(authRequest);
  
            }), catchError(error => {
  
              router.navigate(['/login']);
              return throwError(() => error);
  
            })
  
          );
        }else {
          authService.logout();
          router.navigate(['/login']);
          return throwError(() => new Error('Sesión cerrada'));
        }
        
    })
  );
  
};
