import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoCreateRequest } from './pedido.create.request';
import { AppUtils } from '../../app.utils';
import { Observable } from 'rxjs';

const uri = AppUtils.URI_SPRING + "/pedido";

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private http : HttpClient) { }

  registrarPedido(request : PedidoCreateRequest) : Observable<any> {
    console.log('Datos del pedido:', request); 
    return this.http.post(`${uri}/registrar`, request)
  }
  
}
