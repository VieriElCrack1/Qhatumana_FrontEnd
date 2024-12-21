import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../../app.utils';
import { Observable } from 'rxjs';
import { UsuarioResponse } from './usuario.response';
import { UsuarioRequest } from './usuario.request';

const uri = AppUtils.URI_SPRING + "/usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http : HttpClient) { }

  buscarUsuario(id : any) : Observable<UsuarioResponse> {
    return this.http.get<UsuarioResponse>(`${uri}/buscar/` + id);
  }

  actualizarUsuarioSinImagen(usuario : UsuarioRequest) : Observable<any> {
    return this.http.put<any>(`${uri}/modificarsinimagen`,usuario);
  }

  actualizarUsuarioImagen(idusuario: number, file: File) : Observable<any> {
    const formData: FormData = new FormData();
    formData.append('idusuario', idusuario.toString());
    formData.append('file', file, file.name);
    return this.http.put<any>(`${uri}/modificarconimagen`, formData);
  }
}
