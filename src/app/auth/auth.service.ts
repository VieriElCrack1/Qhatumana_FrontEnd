import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../app.utils';
import { Observable, tap } from 'rxjs';
import { AuthResponse } from './auth.response';
import { CreateUserRequest } from './create.user.request';
import { ToastrService } from 'ngx-toastr';

const uri = AppUtils.URI_SPRING + "/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private toastr : ToastrService) { }

  login(response : AuthResponse) : Observable<any> {
    return this.http.post(`${uri}/login`, response).pipe(
      tap((data : AuthResponse) => {
        if(data.status) {
          this.toastr.success(data.message, "Mensaje", {
            timeOut: 3000,
            progressBar: true
          });
          console.log(data.message);
          if (data?.jwt) {
            localStorage.setItem('token', data.jwt); //access token
          }
          if (data?.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken); //refresh token
          }
        }
        
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post(`${uri}/refresh`, {}, { headers : { 'X-Refresh-Token' : refreshToken! } }).pipe(
      tap((data: any) => {
        console.log('Token refreshed:', data);
        if (data?.jwt) {
          localStorage.setItem('token', data.jwt); // Actualizar access token
        }
        if (data?.refreshToken) {
          localStorage.setItem('refreshToken', data.refreshToken); // Actualizar refresh token
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setTimeout(() => {
      location.reload();
    }, 100)
    this.toastr.success("Sesión Cerrada", "Mensaje", {
      timeOut: 3000,
      progressBar: true
    });
  }
  
  isLogueado() : Boolean {
    return !!localStorage.getItem('token');
  }

  registerUsuario(response : CreateUserRequest) : Observable<any> {
    return this.http.post<any>(`${uri}/register`, response).pipe(
      tap((data : AuthResponse) => {
        if(data.status) {
          this.toastr.success(data.message, "Mensaje", {
            timeOut: 1500,
            progressBar: true
          });
          if (data?.jwt) {
            localStorage.setItem('token', data.jwt); //access token
          }
          if (data?.refreshToken) {
            localStorage.setItem('refreshToken', data.refreshToken); //refresh token
          }
        }else {
          this.toastr.error("Error en el registro, Intente de nuevo", "Mensaje");
        }
        
      }, error => {
        this.toastr.error("Error en el registro, Intente de nuevo", "Mensaje");
        console.log(error);
      })
    );
  }
}
