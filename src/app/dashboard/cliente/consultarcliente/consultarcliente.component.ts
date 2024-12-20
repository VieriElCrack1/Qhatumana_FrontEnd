import { Component, OnInit, ViewChild } from '@angular/core';
import { ClienteResponseLista } from '../cliente.response.lista';
import { ClienteService } from '../cliente.service';
import { ClienteUpdateRequest } from '../cliente.update.request';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-consultarcliente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './consultarcliente.component.html',
  styleUrl: './consultarcliente.component.css'
})
export class ConsultarclienteComponent implements OnInit{
  clientes : ClienteResponseLista[] = [];
  clientesOriginales : ClienteResponseLista[] = [];

  clienteUpdate : ClienteUpdateRequest = {};

  constructor(private clienteService : ClienteService) {}

  ngOnInit(): void {
    this.clienteService.listadoClientes().subscribe(x => {
      this.clientes = [];
      this.clientes = [...x];
      this.clientesOriginales = [...x];
    });
  }

  cargarClienteParaModificar(idcliente: number): void {
    this.clienteService.buscarCliente(idcliente).subscribe(cliente => {
      this.clienteUpdate = cliente.data;
    });
  }

  modificarCliente() {
    this.clienteService.modificarCliente(this.clienteUpdate).subscribe(x => {
      if(x.status === "EXITO") {
        Swal.fire({
          title: "Mensaje",
          text: x.message,
          timer: 3000,
          icon: "success"
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        this.clienteUpdate = {};
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

  buscarCliente(event : any) {
    const nomcliente = event?.target.value.toLowerCase();
    if (nomcliente === '') {
      this.clientes = [...this.clientesOriginales];
    } else {
      this.clientes = this.clientesOriginales.filter(cliente => 
        `${cliente.nomcliente} ${cliente.apecliente}`.toLowerCase().includes(nomcliente)
      );
    }
  }
}

