import { Component, OnInit } from '@angular/core';
import { PedidoCreateRequest } from '../pedido.create.request';
import { PedidoService } from '../pedido.service';
import Swal from 'sweetalert2';
import { ProductoResponse } from '../../producto/producto.response';
import { ProductoService } from '../../producto/producto.service';
import { ClienteService } from '../../cliente/cliente.service';
import { ClienteResponseLista } from '../../cliente/cliente.response.lista';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../dashboard.service';

@Component({
  selector: 'app-registropedido',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registropedido.component.html',
  styleUrl: './registropedido.component.css'
})
export class RegistropedidoComponent implements OnInit{
  
  pedido: PedidoCreateRequest = {
    idcliente: 0,
    idusuario: 0,
    idestado: 1,
    direccion: '',
    descuento: 0,
    detalles: [] as { idproducto?: number; cantidad?: number }[]
  }
  productos : ProductoResponse[] = [];
  productosOriginales: ProductoResponse[] = [];
  productosSeleccionados: ProductoResponse[] = [];

  clientes : ClienteResponseLista[] = [];
  clientesOriginales : ClienteResponseLista[] = [];
  clientesSeleccionados : ClienteResponseLista[] = [];

  descuento: number = 0;

  usuario : any = {};

  constructor(private pedidoService : PedidoService, private productoService : ProductoService,
              private clienteService : ClienteService, private dashService : DashboardService) {}

  ngOnInit(): void {
     this.pedido.detalles = this.pedido.detalles || []; 
    this.dashService.dashboardDatos().subscribe(
      x => {
        this.usuario = x.USUARIO;
        console.log("Prueba pedido obtener usuario: ", this.usuario);
        console.log(this.usuario);
        this.pedido.idusuario = this.usuario.idusuario;
      }, error => {
        console.error('Error al cargar el menu:', error);
      }
    );

    this.productoService.listadoProducto().subscribe(x => {
      this.productos = [];
      this.productos = x;
      this.productosOriginales = [...x];
    });

    this.clienteService.listadoClientes().subscribe(x => {
      this.clientes = [];
      this.clientes = x;
      this.clientesOriginales = [...this.clientes];
    });
  }

  //PRODUCTO
  agregarProducto(producto: any): void {
    const existe = this.productosSeleccionados.find(p => p.idproducto === producto.idproducto);
    if (!existe) {
      this.productosSeleccionados.push({
        ...producto,
        cantidad: 0,
        precio: producto.precio
      });

      if (this.pedido.detalles) {
        this.pedido.detalles.push({
          idproducto: producto.idproducto,
          cantidad: 0
        });
      } else {
        this.pedido.detalles = [{
          idproducto: producto.idproducto,
          cantidad: 0
        }];
      }
    } else {
      Swal.fire('Producto ya agregado', 'Este producto ya está en la lista', 'warning');
    }
  }
  
  eliminarProducto(producto: any): void {
    this.productosSeleccionados = this.productosSeleccionados.filter(p => p.idproducto !== producto.idproducto);
    this.actualizarMontoTotal();
  }

  validarStock(producto: ProductoResponse, event: any) {
    const cantidad = Number(event.target.value);
    if (cantidad > producto.stock!!) {
      Swal.fire('Stock Excedido', `Solo hay ${producto.stock} unidades disponibles`, 'error');
      event.target.value = producto.stock;
    }
  }

  obtenerIdProductoSeleccionado(): number | undefined {
    const tabla = document.querySelector('table tbody')!;
    const filaSeleccionada = tabla.querySelector('tr.selected') as HTMLElement;
    return filaSeleccionada ? Number(filaSeleccionada.getAttribute('data-idproducto')) : undefined;
  }

  actualizarMontoTotal(): void {
    let total = 0;
    this.productosSeleccionados.forEach((producto) => {
      const cantidad = Number((document.querySelector(`#cantidad-${producto.idproducto}`) as HTMLInputElement).value);
      total += cantidad * producto.precio!;
    });
    this.actualizarMontoConDescuento(total);
  }

  actualizarMontoConDescuento(monto: number): void {
    const descuentoAplicado = (this.descuento / 100) * monto;
    const montoFinal = monto - descuentoAplicado;
    document.getElementById('monto-total')!.textContent = montoFinal.toFixed(2);
  }

  buscarProducto(event : any) {
    const nomprod = event?.target.value.toLowerCase();
    if (nomprod === '') {
      this.productos = [...this.productosOriginales];
    } else {
      this.productos = this.productosOriginales.filter(producto => 
        producto.nomproducto?.toLowerCase().includes(nomprod)
      );
    }
  }
  
  //CLIENTE
  buscarCliente(event : any) {
    const nomcliente = event?.target.value.toLowerCase();
    if (nomcliente === '') {
      this.clientes = [...this.clientesOriginales];
    } else {
      this.clientes = this.clientesOriginales.filter(cliente => 
        cliente.nomcliente?.toLowerCase().includes(nomcliente)
      );
    }
  }

  agregarCliente(cliente: any) {
    this.pedido.idcliente = cliente.idcliente;
    const existe = this.clientesSeleccionados.find(c => c.idcliente === cliente.idcliente);
    if (!existe) {
      this.clientesSeleccionados.push(cliente);
      const clienteDato = document.getElementById('cliente') as HTMLInputElement;
      const idcliente = document.getElementById('idcliente') as HTMLInputElement;
      if (clienteDato) {
        clienteDato.value = `${cliente.nomcliente} ${cliente.apecliente}`;
      }
      if(idcliente) {
        idcliente.value = `${cliente.idcliente}`;
      }
    } else {
      Swal.fire('Cliente ya agregado', 'Este cliente ya está en la lista', 'warning');
    }
  }

  onDescuentoChange(event: any): void {
    this.descuento = Number(event.target.value);
    this.actualizarMontoTotal();
  }

  registrarPedido() {
    if(this.pedido.detalles == null) {
      Swal.fire('Error', 'Debe seleccionar los productos', 'error');
      return;
    }
    
    if (this.pedido.idusuario === 0 || this.pedido.idcliente === 0) {
      Swal.fire('Error', 'Debe seleccionar un cliente', 'error');
      return;
    }

    this.pedidoService.registrarPedido(this.pedido).subscribe(x => {
      console.log('data', x);
      if(x.status === "ERROR") {
        Swal.fire({
          title: "Mensaje",
          text: x.message,
          timer: 3000,
          icon: "error"
        });
      }else {
        Swal.fire({
          title: "Mensaje",
          text: x.message,
          timer: 3000,
          icon: "success"
        });
        this.pedido = { detalles: [], idusuario: undefined, idcliente: undefined, direccion: '', descuento: 0 };
        this.pedido = {};
      }
    }, error => {
      console.log(error.message);
      Swal.fire({
        title: "Mensaje",
        text: error.message,
        timer: 3000,
        icon: "error"
      });
    });
  }


}
