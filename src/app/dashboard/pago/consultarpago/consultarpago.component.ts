import { Component, OnInit } from '@angular/core';
import { PagoPedidoConsultaResponse } from '../pago.pedido.consulta.response';
import { PagoService } from '../pago.service';
import { PagoPedidoUpdateRequest } from '../pago.pedido.update.request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultarpago',
  standalone: true,
  imports: [],
  templateUrl: './consultarpago.component.html',
  styleUrl: './consultarpago.component.css'
})
export class ConsultarpagoComponent implements OnInit {

  pagopedidoupdate : PagoPedidoUpdateRequest = {}

  listaPagoPedido : PagoPedidoConsultaResponse[] = [];
  consultaPagoPedido : PagoPedidoConsultaResponse[] = [];

  constructor(private pagoPedidoService : PagoService) {}

  ngOnInit(): void {
    this.pagoPedidoService.consultarPagoPedidoXNomcliente("").subscribe(x => {
      console.log(x);
      if (Array.isArray(x)) {
        this.listaPagoPedido = [...x];
        this.consultaPagoPedido = [...x];
      } else {
        console.error('La respuesta no es un arreglo', x);
      }
    });
  }

  actualizarEstado(pedido: PagoPedidoConsultaResponse, event: any): void {
    const nuevoEstado = event.target.checked;

    pedido.estadopago = nuevoEstado ? 'Activo' : 'Inactivo';

    this.pagopedidoupdate = {
      idpago: pedido.idpago,
      estado: nuevoEstado
    };

    this.modificarPagoPedido();
  }

  modificarPagoPedido() {
    this.pagoPedidoService.modificarPagoPedido(this.pagopedidoupdate).subscribe(x => {
      if(x.status === "EXITO") {
        Swal.fire({
          title: "Mensaje",
          text: x.message,
          timer: 3000,
          icon: "success"
        });

        this.pagopedidoupdate = {};
      }
    }, error => {
      Swal.fire({
        title: "Mensaje",
        text: error.message,
        timer: 3000,
        icon: "error"
      })
    });
  }

  buscarPagoPedido(cliente : HTMLInputElement) {
    const nomcliente = cliente?.value.toLowerCase();
    if (nomcliente === '') {
      this.listaPagoPedido = [...this.consultaPagoPedido];
    } else {
      this.pagoPedidoService.consultarPagoPedidoXNomcliente(nomcliente).subscribe((x: PagoPedidoConsultaResponse[] | null) => {
        this.listaPagoPedido = Array.isArray(x) ? x : [];
      });
    }
  }
}
