import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../../app.utils';
import { Observable } from 'rxjs';
import { FacturaPedidoRequest } from './factura.pedido.request';

const uri = AppUtils.URI_SPRING + "/factura";

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  constructor(private http : HttpClient) { }

  registrarFactura(factura : FacturaPedidoRequest) : Observable<any> {
    return this.http.post<any>(`${uri}/registrar`,factura);
  }
}
