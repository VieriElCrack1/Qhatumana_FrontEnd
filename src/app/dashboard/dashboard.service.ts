import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppUtils } from '../app.utils';

const URL = AppUtils.URI_SPRING + "/auth/dashboard";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http : HttpClient) { }

  dashboardDatos() : Observable<any> {
    return this.http.get<any>(URL);
  }
}
