import { Component, OnInit } from '@angular/core';
import { PedidoConsultaResponse } from '../pedido.consulta.response';
import { PedidoService } from '../pedido.service';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-consultarpedido',
  standalone: true,
  imports: [PercentPipe],
  templateUrl: './consultarpedido.component.html',
  styleUrl: './consultarpedido.component.css'
})
export class ConsultarpedidoComponent implements OnInit{

  listaPedido : PedidoConsultaResponse[] = [];
  consultaPedido : PedidoConsultaResponse[] = [];

  constructor(private pedidoService : PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.listaPedido().subscribe(x => {
      console.log(x);
      
      this.listaPedido = [];
      this.listaPedido = [...x];
      this.consultaPedido = [...x];
    })
  }

  buscarPedido(cliente: HTMLInputElement) {
    const nomcliente = cliente?.value.toLowerCase();
    if (nomcliente === '') {
      this.listaPedido = [...this.consultaPedido];
    } else {
      this.pedidoService.consultarPedidoXNombre(nomcliente).subscribe((x: PedidoConsultaResponse[] | null) => {
        this.listaPedido = Array.isArray(x) ? x : [];
      });
    }
  }
}
