import { Component, OnInit } from '@angular/core';
import { ProductoResponse } from './producto.response';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit{

  productos : ProductoResponse[] = []

  constructor(private productoService : ProductoService) {}

  ngOnInit(): void {
    this.listadoProducto();
  }

  listadoProducto() {
    this.productoService.listadoProducto().subscribe(x => {
      this.productos = [];
      this.productos = x;
    });
  }
}
