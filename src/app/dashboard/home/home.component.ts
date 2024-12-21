import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { ProductoResponse } from '../producto/producto.response';
import { ProductoService } from '../producto/producto.service';
import { ClienteService } from '../cliente/cliente.service';
import { CommonModule } from '@angular/common';
import { ClienteResponseLista } from '../cliente/cliente.response.lista';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  listaProductos : ProductoResponse[] = [];
  listadoCliente : ClienteResponseLista[] = [];
  
  constructor(private productoService : ProductoService, private clienteService : ClienteService) {}

  ngOnInit(): void {
    this.productoService.listadoProducto().subscribe(x => {
      this.listaProductos = [];
      this.listaProductos = [...x];
    });

    this.clienteService.listadoClientes().subscribe(x => {
      this.listadoCliente = [];
      this.listadoCliente = [...x];
    });
  }
}
