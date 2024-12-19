import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../../app.utils';
import { Observable } from 'rxjs';
import { UsuarioResponse } from './usuario.response';

const uri = AppUtils.URI_SPRING + "/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http : HttpClient) { }

  buscarUsuario(id : any) : Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${uri}/buscar/` + id);
  }
}
