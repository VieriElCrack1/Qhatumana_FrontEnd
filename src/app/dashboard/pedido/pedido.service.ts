import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PedidoCreateRequest } from './pedido.create.request';
import { AppUtils } from '../../app.utils';
import { Observable } from 'rxjs';
import { PedidoConsultaResponse } from './pedido.consulta.response';

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

  valorId() : Observable<any> {
    return this.http.get<any>(`${uri}/valorid`);
  }

  listaPedido() : Observable<PedidoConsultaResponse[]> {
    return this.http.get<PedidoConsultaResponse[]>(`${uri}/lista`);
  }
  
  consultarPedidoXNombre(nomcliente: string): Observable<PedidoConsultaResponse[]> {
    const param = new HttpParams().set('nomcliente', nomcliente);
    return this.http.get<PedidoConsultaResponse[]>(`${uri}/consultarpedido`, { params: param });
  }
}
