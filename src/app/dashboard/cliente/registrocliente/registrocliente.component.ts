import { AfterViewInit, Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ClienteCreateRequest } from '../cliente-create-request';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registrocliente',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registrocliente.component.html',
  styleUrl: './registrocliente.component.css'
})
export class RegistroclienteComponent implements AfterViewInit{

  cliente : ClienteCreateRequest = {}

  constructor(private clienteService : ClienteService) {}

  ngAfterViewInit(): void {
    (() => {
      'use strict'
      
      const forms = document.querySelectorAll<HTMLFormElement>('.needs-validation')
    
      // Loop over them and prevent submission
      Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
    
          form.classList.add('was-validated')
        }, false)
      })
    })()
  }

  guardarCliente() {
    this.clienteService.registrarCliente(this.cliente).subscribe(x => {
      if(x.status === "EXITO") {
        Swal.fire({
          title: "Mensaje",
          text: x.message,
          timer: 3000,
          icon: "success"
        });
        this.cliente = {}
        this.restablecerValidacionFormulario();
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
      console.error(error);
    });
  }

  restablecerValidacionFormulario() {
    const forms = document.querySelectorAll<HTMLFormElement>('.needs-validation');
    Array.from(forms).forEach(form => {
      form.classList.remove('was-validated');
      form.reset();
    });
  }
}
