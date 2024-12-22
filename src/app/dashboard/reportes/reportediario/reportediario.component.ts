import { Component, OnInit } from '@angular/core';
import { ReportePedidoResponse } from '../reporte.pedido.response';
import { ReportesService } from '../reportes.service';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-reportediario',
  standalone: true,
  imports: [PercentPipe],
  templateUrl: './reportediario.component.html',
  styleUrl: './reportediario.component.css'
})
export class ReportediarioComponent implements OnInit{

  reportediario : ReportePedidoResponse[] = [];

  constructor(private reporteService : ReportesService) {}

  ngOnInit(): void {
    this.reporteService.reportediario().subscribe(x => {
      this.reportediario = [];
      this.reportediario = [...x];
    });
  }
}
