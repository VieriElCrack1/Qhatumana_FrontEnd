import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../../app.utils';
import { Observable } from 'rxjs';
import { FacturaPedidoRequest } from './factura.pedido.request';
import { FacturaPedidoResponse } from './factura.pedido.response';
import { FacturaPedidoUpdateRequest } from './factura.pedido.update.resquest';

const uri = AppUtils.URI_SPRING + "/factura";

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http : HttpClient) { }

  registrarFactura(factura : FacturaPedidoRequest) : Observable<any> {
    return this.http.post<any>(`${uri}/registrar`,factura);
  }

  modificarFactura(factura : FacturaPedidoUpdateRequest) : Observable<any> {
    return this.http.put<any>(`${uri}/modificar`,factura);
  }

  consultarfacturaXCliente(cliente : any) : Observable<FacturaPedidoResponse[]> {
    let param = new HttpParams().set("cliente",cliente);
    return this.http.get<FacturaPedidoResponse[]>(`${uri}/consultarfactura`, {params: param});
  }
}
