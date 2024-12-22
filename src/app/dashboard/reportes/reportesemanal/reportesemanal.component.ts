import { Component, OnInit } from '@angular/core';
import { ReportePedidoResponse } from '../reporte.pedido.response';
import { ReportesService } from '../reportes.service';
import { PercentPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reportesemanal',
  standalone: true,
  imports: [PercentPipe, FormsModule],
  templateUrl: './reportesemanal.component.html',
  styleUrl: './reportesemanal.component.css'
})
export class ReportesemanalComponent implements OnInit{

  reportesemanal : ReportePedidoResponse[] = [];

  fechainicio: string = '';
  fechafin: string = '';

  maxFecha: string = '';
  minFecha: string = ''

  constructor(private reporteService : ReportesService) {}

  ngOnInit(): void {
    const hoy = new Date();
    const sieteDiasAntes = new Date();
    sieteDiasAntes.setDate(hoy.getDate() - 7);

    this.minFecha = sieteDiasAntes.toISOString().split('T')[0];
    this.maxFecha = hoy.toISOString().split('T')[0];
    
    this.fechainicio = this.minFecha;
    this.fechafin = this.maxFecha;

    this.reporteService.reportesemanal("","").subscribe(x => {
      this.reportesemanal = [];
      this.reportesemanal = [...x];
    });
  }

  consultarReporte() {
    if (this.fechainicio && this.fechafin) {
      this.reporteService.reportesemanal(this.fechainicio, this.fechafin).subscribe((res) => {
        this.reportesemanal = res;
      }, (error) => {
        console.error('Error al consultar reporte', error);
      });
    } else {
      alert('Por favor, seleccione un rango de fechas.');
    }
  }

}
