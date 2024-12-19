import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AuthResponse } from '../auth.response';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CreateUserRequest } from '../create.user.request';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authentication',
  standalone: true,
  imports: [FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {

  container!: HTMLElement;
  btnSignIn!: HTMLElement;
  btnSignUp!: HTMLElement;

  authResponse : AuthResponse = {}

  registerResponse : CreateUserRequest = {}

  constructor(private authService : AuthService, private router : Router, private toastr : ToastrService) {}

  registrarUsuario() {
    event?.preventDefault();
    const nomuser = (document.getElementById('nomuser') as HTMLInputElement).value.trim();
    const apeuser = (document.getElementById('apeuser') as HTMLInputElement).value.trim();
    const username = (document.getElementById('usernamereg') as HTMLInputElement).value.trim();
    const password = (document.getElementById('passwordreg') as HTMLInputElement).value.trim();
    const dni = (document.getElementById('dni') as HTMLInputElement).value.trim();

    if(!nomuser || !apeuser || !username || !password  || !dni) {
      this.toastr.error('Complete los campos', 'Mensaje', {
        timeOut: 1500,
        progressBar: true
      });
      return;
    }

    if(nomuser.match(/^\d+$/)) {
      this.toastr.error('El nombre no debe de contener digitos', 'Mensaje', {
        timeOut: 1500,
        progressBar: true
      });
      return;
    }

    if(apeuser.match(/^\d+$/)) {
      this.toastr.error('El apellido no debe de contener digitos', 'Mensaje', {
        timeOut: 1500,
        progressBar: true
      });
      return;
    }

    if(!username.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      this.toastr.error('Formato de email invalido', 'Mensaje', {
        timeOut: 1500,
        progressBar: true
      });
      return;
    }

    if(password.length > 10) {
      this.toastr.error('La contraseña debe tener maximo 10 caracteres', 'Mensaje', {
        timeOut: 1500,
        progressBar: true
      });
      return;
    }

    if(dni.length !== 8) {
      this.toastr.error('El DNI debe tener 8 digitos', 'Mensaje', {
        timeOut: 1500,
        progressBar: true
      });
      return;
    }

    this.authService.registerUsuario(this.registerResponse).subscribe(x => {
      localStorage.setItem('token', x.jwt);
      this.router.navigate(["/dashboard"]);
    },
    error => {
      this.toastr.error("Error Al Registrarse", "Mensaje");
      console.log(error);
    });  
  }
  
  ngAfterViewInit(): void {
    event?.preventDefault();
    this.container = document.querySelector(".container")!;
    this.btnSignIn = document.getElementById("btn-sign-in")!;
    this.btnSignUp = document.getElementById("btn-sign-up")!;

    if (this.btnSignIn && this.btnSignUp && this.container) {
      this.btnSignIn.addEventListener("click", () => {
        this.container.classList.remove("toggle");
      });

      this.btnSignUp.addEventListener("click", () => {
        this.container.classList.add("toggle");
      });
    } else {
      console.error("No se encontraron los elementos del DOM necesarios.");
    }
    
  }

  ingresarSistema() {

    const username = (document.getElementById('usernamelog') as HTMLInputElement).value.trim();
    const password = (document.getElementById('passwordlog') as HTMLInputElement).value.trim();

    if (!username || !password) {
      this.toastr.error('Complete los campos', 'Mensaje', {
        timeOut: 1500,
        progressBar: true
      });
      return;
    }

    if(!username.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      this.toastr.error('Formato de email invalido', 'Mensaje', {
        timeOut: 1500,
        progressBar: true
      });
      return;
    }

    if(password.length > 10) {
      this.toastr.error('La contraseña debe tener maximo 10 caracteres', 'Mensaje', {
        timeOut: 1500,
        progressBar: true
      });
      return;
    }

    this.authService.login(this.authResponse).subscribe(x => {
      localStorage.setItem('token', x.jwt);
      this.router.navigateByUrl("/dashboard/home");
    },
    error => {
      this.toastr.error("Credenciales Incorrectas", "Mensaje", {
        timeOut: 2000,
        progressBar: true
      });
      console.log(error);
    });
  }
  
}
