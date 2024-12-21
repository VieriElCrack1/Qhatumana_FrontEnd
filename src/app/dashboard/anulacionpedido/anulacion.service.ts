import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../../app.utils';
import { Observable } from 'rxjs';
import { AnularPedidoRequest } from './anular.pedido.request';
import { AnularPedidoResponse } from './anular.pedido.response';

const uri = AppUtils.URI_SPRING + "/anularpedido";

@Injectable({
  providedIn: 'root'
})
export class AnulacionService {

  constructor(private http : HttpClient) { }

  registrarAnulacionPedido(anularpedido : AnularPedidoRequest) : Observable<any> {
    return this.http.post<any>(`${uri}/registrar`,anularpedido);
  }

  consultaranulacionpedido(cliente : any) : Observable<AnularPedidoResponse[]> {
    let param = new HttpParams().set("cliente",cliente);
    return this.http.get<AnularPedidoResponse[]>(`${uri}/consultaranulacionpedido`, {params: param});
  }
}
