import { Injectable } from '@angular/core';
import { AppUtils } from '../../app.utils';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PagoPedidoRequest } from './pago.pedido.request';
import { Observable } from 'rxjs';
import { PagoPedidoConsultaResponse } from './pago.pedido.consulta.response';
import { PagoPedidoUpdateRequest } from './pago.pedido.update.request';

const uri = AppUtils.URI_SPRING + "/pagopedido";

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http : HttpClient) { }
  
  registrarPagoPedido(pagopedido : PagoPedidoRequest) : Observable<any> {
    return this.http.post<any>(`${uri}/registrar`, pagopedido);
  }

  consultarPagoPedidoXNomcliente(cliente : any) : Observable<PagoPedidoConsultaResponse[]> {
    let param = new HttpParams().set("cliente", cliente);
    return this.http.get<PagoPedidoConsultaResponse[]>(`${uri}/consultarpagopedido`, {params: param});
  }

  modificarPagoPedido(pagopedido : PagoPedidoUpdateRequest) : Observable<any> {
    return this.http.put<any>(`${uri}/modificar`,pagopedido);
  }
  
}
