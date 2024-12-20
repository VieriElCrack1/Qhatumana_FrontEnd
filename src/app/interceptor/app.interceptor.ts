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

            switchMap((nuevoToken: any) => {
  
                authRequest = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${nuevoToken.jwt}`
                  }
                });
              
                return next(authRequest);
  
            }), catchError(error => {
  
              router.navigate(['/auth']);
              return throwError(() => error);
  
            })
  
          );
        }else {
          console.error('Error de autenticación:', error);
          if (error.status === 500) {
            console.error('Mensaje de error:', error.error.message);
          }
          return throwError(() => new Error("" + error.error.message));
        }
        
    })
  );
  
};
