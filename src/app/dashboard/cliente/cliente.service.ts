import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../../app.utils';
import { ClienteCreateRequest } from './cliente-create-request';
import { Observable } from 'rxjs';
import { ClienteResponseLista } from './cliente.response.lista';

const uri = AppUtils.URI_SPRING + "/cliente"

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http : HttpClient) { }

  registrarCliente(cliente : ClienteCreateRequest) : Observable<any> {
    return this.http.post(`${uri}/registrar`, cliente);
  }

  listadoClientes() : Observable<ClienteResponseLista[]> {
    return this.http.get<ClienteResponseLista[]>(`${uri}/lista`);
  }
}
