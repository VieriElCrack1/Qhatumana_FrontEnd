import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppUtils } from '../../app.utils';
import { Observable } from 'rxjs';
import { ReportePedidoResponse } from './reporte.pedido.response';

const uri = AppUtils.URI_SPRING + "/reporte";

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http : HttpClient) { }

  reportediario() : Observable<ReportePedidoResponse[]> {
    return this.http.get<ReportePedidoResponse[]>(`${uri}/reportedia`);
  }

  reportesemanal(fechainicio : any, fechafin : any) : Observable<ReportePedidoResponse[]> {
    let param = new HttpParams().set("fechainicio",fechainicio).set("fechafin",fechafin);
    return this.http.get<ReportePedidoResponse[]>(`${uri}/reportesemanal`, {params: param});
  }

  reportemensual(mes : number) : Observable<ReportePedidoResponse[]> {
    let param = new HttpParams().set("mes",mes);
    return this.http.get<ReportePedidoResponse[]>(`${uri}/reportemensual`, {params: param});
  }
}
