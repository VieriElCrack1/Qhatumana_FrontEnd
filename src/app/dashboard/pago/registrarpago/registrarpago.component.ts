import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PagoPedidoRequest } from '../pago.pedido.request';
import { MetodoPagoResponse } from '../metodo.pago.response';
import { PagoService } from '../pago.service';
import { PedidoService } from '../../pedido/pedido.service';
import { MetodopagoService } from '../metodopago.service';
import Swal from 'sweetalert2';
import { FacturaService } from '../../factura/factura.service';
import { FacturaPedidoRequest } from '../../factura/factura.pedido.request';
import { PedidoConsultaResponse } from '../../pedido/pedido.consulta.response';

@Component({
  selector: 'app-registrar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrarpago.component.html',
  styleUrl: './registrarpago.component.css'
})
export class RegistrarComponent implements OnInit {

  pagopedido : PagoPedidoRequest = {
    idpedido: 0,
    idmetodoPago: 0
  };

  metodoPago : MetodoPagoResponse[] = [];

  idpedido : number = 0;

  facturaPedido : FacturaPedidoRequest = {
    idpedido: 0
  }

  pedidoConsultaEstado : PedidoConsultaResponse[] = [];
  pedidoConsultaEstadoBuscado : PedidoConsultaResponse[] = [];
  pedidoConsultaEstadoSeleccionado : PedidoConsultaResponse[] = [];

  constructor(private pagoPedidoService : PagoService, private pedidoService : PedidoService, 
    private metodoPagoService : MetodopagoService, private facturaService : FacturaService) {}

  ngOnInit(): void {
    this.pedidoService.consultarpedidoestado("",1).subscribe(x => {
      this.pedidoConsultaEstado = [];
      this.pedidoConsultaEstado = [...x];
      this.pedidoConsultaEstadoBuscado = [...x];
    });

    this.metodoPagoService.listadoMetodoPago().subscribe(x => {
      this.metodoPago = x;
      console.log(x);
    });
  }

  agregarPedido(pedido : any) {
    const existe = this.pedidoConsultaEstadoSeleccionado.find(p => p.idpedido === pedido.idpedido);
    if(!existe) {
      this.pedidoConsultaEstadoSeleccionado.push({...pedido});
      this.pagopedido.idpedido = pedido.idpedido;
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

  registrarPagoPedido() {
    console.log('ID Pedido:', this.pagopedido.idpedido);
    console.log("PEDIDO : " + this.pagopedido.idmetodoPago)

    if(this.pagopedido.idmetodoPago == 0) {
      Swal.fire({
        title: "Mensaje",
        text: "SELECIONE EL METODO DE PAGO",
        timer: 3000,
        icon: "error"
      });
      return;
    }
    this.pagopedido.idmetodoPago = Number(this.pagopedido.idmetodoPago);
    if(this.pagopedido.idpedido == 0) {
      Swal.fire({
        title: "Mensaje",
        text: "SELECIONE EL PEDIDO",
        timer: 3000,
        icon: "error"
      });
      return;
    }

    this.pagoPedidoService.registrarPagoPedido(this.pagopedido).subscribe(x => {
      
      if(x.status == "EXITO") {
        Swal.fire({
          title: "Mensaje",
          text: x.message,
          timer: 3000,
          icon: "success"
        });
        this.pagopedido = {idpedido: 0, idmetodoPago: 0};
        
        this.facturaPedido.idpedido = this.idpedido;

        this.facturaService.registrarFactura(this.facturaPedido).subscribe(x => {
          if(x.status === "EXITO") {
            Swal.fire({
              title: "Mensaje",
              text: x.message,
              timer: 3000,
              icon: "success"
            }).then(() => {
              window.open(x.data.urlfactura, '_blank');
            });
            
          }
        }, error => {
          Swal.fire({
            title: "Mensaje",
            text: error.message,
            timer: 3000,
            icon: "error"
          });
          console.log(error);
        });

      }else {
        Swal.fire({
          title: "Mensaje",
          text: x.message,
          timer: 3000,
          icon: "error"
        });
      }
    }, error => {
      Swal.fire({
        title: "Mensaje",
        text: error.message,
        timer: 3000,
        icon: "error"
      });
      console.log(error);
      console.log(this.pagopedido);
    });
  }


}
