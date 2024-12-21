import { Component, OnInit } from '@angular/core';
import { FacturaPedidoResponse } from '../factura.pedido.response';
import { FacturaService } from '../factura.service';
import { DatePipe } from '@angular/common';
import { FacturaPedidoUpdateRequest } from '../factura.pedido.update.resquest';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consultarfactura',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './consultarfactura.component.html',
  styleUrl: './consultarfactura.component.css'
})
export class ConsultarfacturaComponent implements OnInit {

  listaFactura : FacturaPedidoResponse[] = [];
  consultaFacturaCliente : FacturaPedidoResponse[] = [];

  facturaupdate : FacturaPedidoUpdateRequest = {};

  constructor(private facturaService : FacturaService) {}

  ngOnInit(): void {
    this.facturaService.consultarfacturaXCliente("").subscribe(x => {
      this.listaFactura = [];
      this.listaFactura = [...x];
      this.consultaFacturaCliente = [...x];
    });
  }

  actualizarEstado(factura : FacturaPedidoResponse, event : any) {
    const nuevoEstado = event.target.checked;

    factura.estadofactura = nuevoEstado;

    this.facturaupdate = {
      idfactura: factura.idfactura,
      estadofactura: factura.estadofactura
    }

    this.modificarFactura();
  }

  modificarFactura() {
    this.facturaService.modificarFactura(this.facturaupdate).subscribe(x => {
      if(x.status === "EXITO") {
        Swal.fire({
          title: "Mensaje",
          text: x.message,
          timer: 3000,
          icon: "success"
        });

        this.facturaupdate = {};
      }
    }, error => {
      Swal.fire({
        title: "Mensaje",
        text: error.message,
        timer: 3000,
        icon: "error"
      });
    });
  }

  buscarFacturaPedido(cliente : HTMLInputElement) {
    const nomcliente = cliente?.value.toLowerCase();
    if (nomcliente === '') {
      this.listaFactura = [...this.consultaFacturaCliente];
    } else {
      this.facturaService.consultarfacturaXCliente(nomcliente).subscribe((x: FacturaPedidoResponse[] | null) => {
        this.listaFactura = Array.isArray(x) ? x : [];
      });
    }
  }

  irNuevaVentana(urlfactura: any) {
    window.open(urlfactura, '_blank');
  }
}
