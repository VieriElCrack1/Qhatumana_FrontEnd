import { PercentPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReportesService } from '../reportes.service';
import { ReportePedidoResponse } from '../reporte.pedido.response';

@Component({
  selector: 'app-reportemensual',
  standalone: true,
  imports: [PercentPipe, FormsModule],
  templateUrl: './reportemensual.component.html',
  styleUrl: './reportemensual.component.css'
})
export class ReportemensualComponent {

  reportemensual : ReportePedidoResponse[] = [];

  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  mesSeleccionado: number = 0;

  constructor(private reporteService : ReportesService) {}

  consultarReporte() {
    this.reportemensual = [];
    
    if (this.mesSeleccionado > 0) {
      this.reporteService.reportemensual(this.mesSeleccionado).subscribe((res) => {
        this.reportemensual = res;
      }, (error) => {
        console.error('Error al consultar reporte mensual', error);
      });
    }
  }
}
