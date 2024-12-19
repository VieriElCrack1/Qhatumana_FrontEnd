import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoResponse } from './producto.response';
import { AppUtils } from '../../app.utils';

const uri = AppUtils.URI_SPRING + "/producto";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http : HttpClient) { }

  listadoProducto() : Observable<ProductoResponse[]> {
    return this.http.get<ProductoResponse[]>(`${uri}/lista`);
  }
}
