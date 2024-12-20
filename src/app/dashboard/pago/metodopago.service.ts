import { Injectable } from '@angular/core';
import { AppUtils } from '../../app.utils';
import { HttpClient } from '@angular/common/http';
import { MetodoPagoResponse } from './metodo.pago.response';
import { Observable } from 'rxjs';

const uriMetodoPago = AppUtils.URI_SPRING + "/metodopago";

@Injectable({
  providedIn: 'root'
})
export class MetodopagoService {

  constructor(private http : HttpClient) { }

  listadoMetodoPago() : Observable<MetodoPagoResponse[]> {
      return this.http.get<MetodoPagoResponse[]>(`${uriMetodoPago}/lista`);
  }
}
