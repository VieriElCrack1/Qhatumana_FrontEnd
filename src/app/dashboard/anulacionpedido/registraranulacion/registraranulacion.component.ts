import { Component, OnInit } from '@angular/core';
import { AnulacionService } from '../anulacion.service';
import { PedidoService } from '../../pedido/pedido.service';
import { AnularPedidoRequest } from '../anular.pedido.request';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { PedidoConsultaResponse } from '../../pedido/pedido.consulta.response';
import { PercentPipe } from '@angular/common';

@Component({
  selector: 'app-registraranulacion',
  standalone: true,
  imports: [FormsModule, PercentPipe],
  templateUrl: './registraranulacion.component.html',
  styleUrl: './registraranulacion.component.css'
})
export class RegistraranulacionComponent implements OnInit{

  anulacionregistro : AnularPedidoRequest = {
    idpedido: 0,
    motivoanulacion: ''
  };

  idpedido : number = 0;

  pedidoConsultaEstado : PedidoConsultaResponse[] = [];
  pedidoConsultaEstadoBuscado : PedidoConsultaResponse[] = [];
  pedidoConsultaEstadoSeleccionado : PedidoConsultaResponse[] = [];

  constructor(private anulacionService : AnulacionService, private pedidoService : PedidoService) {}

  ngOnInit(): void {
    this.pedidoService.consultarpedidoestado("",2).subscribe(x => {
      this.pedidoConsultaEstado = [];
      this.pedidoConsultaEstado = [...x];
      this.pedidoConsultaEstadoBuscado = [...x];
    });
  }

  agregarPedido(pedido : any) {
      const existe = this.pedidoConsultaEstadoSeleccionado.find(p => p.idpedido === pedido.idpedido);
      if(!existe) {
        this.pedidoConsultaEstadoSeleccionado.push({...pedido});
        this.anulacionregistro.idpedido = pedido.idpedido;
      }else {
        Swal.fire('Pedido ya agregado', 'Este pedido ya está en la lista', 'warning');
      }
    }
  
    buscarPedidoXCliente(event : any) {
      const nomcliente = event?.target.value.toLowerCase();
      if (nomcliente === '') {
        this.pedidoConsultaEstado = [...this.pedidoConsultaEstadoBuscado];
      } else {
        this.pedidoConsultaEstado = this.pedidoConsultaEstadoBuscado.filter(pedido => 
          `${pedido.cliente}`.toLowerCase().includes(nomcliente)
        );
      }
    }

  registrarAnulacionPedido() {
    if(this.anulacionregistro.idpedido == 0) {
      Swal.fire({
        title: "Mensaje",
        text: "SELECIONE EL PEDIDO",
        timer: 3000,
        icon: "error"
      });
      return;
    }

    if(this.anulacionregistro.motivoanulacion === "") {
      Swal.fire({
        title: "Mensaje",
        text: "Comente el motivo de la anulación",
        timer: 3000,
        icon: "error"
      });
      return;
    }

    this.anulacionService.registrarAnulacionPedido(this.anulacionregistro).subscribe(x => {
      if(x.status === "EXITO") {
        Swal.fire({
          title: "Mensaje",
          text: x.message,
          timer: 3000,
          icon: "success"
        }).then(() => {
          window.location.reload();
        });

        this.anulacionregistro = {idpedido: 0, motivoanulacion: ''};
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
}
