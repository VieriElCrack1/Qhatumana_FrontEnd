import { Component, OnInit } from '@angular/core';
import { AnularPedidoResponse } from '../anular.pedido.response';
import { AnulacionService } from '../anulacion.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultaanulacion',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './consultaanulacion.component.html',
  styleUrl: './consultaanulacion.component.css'
})
export class ConsultaanulacionComponent implements OnInit{

  listaAnulacionPedido : AnularPedidoResponse[] = [];
  consultarAnulacionPedido : AnularPedidoResponse[] = [];

  constructor(private anularPedidoService : AnulacionService) {}

  ngOnInit(): void {
    this.anularPedidoService.consultaranulacionpedido("").subscribe(x => {
      this.listaAnulacionPedido = [];
      this.listaAnulacionPedido = [...x];
      this.consultarAnulacionPedido = [...x];
    });
  }

  buscarFacturaPedido(cliente : HTMLInputElement) {
const nomcliente = cliente?.value.toLowerCase();
    if (nomcliente === '') {
      this.listaAnulacionPedido = [...this.consultarAnulacionPedido];
    } else {
      this.anularPedidoService.consultaranulacionpedido(nomcliente).subscribe((x: AnularPedidoResponse[] | null) => {
        this.listaAnulacionPedido = Array.isArray(x) ? x : [];
      });
    }
  }
}
