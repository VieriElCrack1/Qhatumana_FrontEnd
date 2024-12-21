import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { UsuarioRequest } from './usuario.request';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements AfterViewInit, OnInit{

  usuarioModificarSinImagen : UsuarioRequest = {};
  usuario : any = {};

  nomrolusuario : string = "";
  urlImagen : string = "";

  constructor(private usuarioService : UsuarioService, private dashboardService : DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.dashboardDatos().subscribe(
      x => {
        this.usuario = x?.USUARIO;
        this.urlImagen = x.USUARIO.urlfoto;
        this.nomrolusuario = this.usuario.rol.nomrol;
        this.usuarioModificarSinImagen.idusuario = this.usuario.idusuario;
        this.usuarioModificarSinImagen.nombre = x.USUARIO.nomusuario;
        this.usuarioModificarSinImagen.apeusuario = x.USUARIO.apeusuario;
        this.usuarioModificarSinImagen.email = x.USUARIO.username;
        this.usuarioModificarSinImagen.password = x.USUARIO.reppassword;
        this.usuarioModificarSinImagen.dni = x.USUARIO.dni;
      }, 
      error => {
        console.error('Error al cargar el menu:', error);
      }
    );
  }

  ngAfterViewInit(): void {
    const fotoPerfil = document.getElementById('fotoPerfil') as HTMLImageElement;
    const fotoInput = document.getElementById('file') as HTMLInputElement;

    if (fotoPerfil && fotoInput) {
      fotoPerfil.addEventListener('click', () => {
        fotoInput.click();
      });

      fotoInput.addEventListener('change', (event) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            fotoPerfil.src = e.target?.result as string;
          };
          reader.readAsDataURL(file);
          this.actualizarUsuarioImagen(file);
        }
      });
    }
  }

  actualizarUsuarioImagen(file: File): void {
    if(this.usuarioModificarSinImagen.idusuario) {
      this.usuarioService.actualizarUsuarioImagen(this.usuarioModificarSinImagen.idusuario, file).subscribe(
        response => {
          Swal.fire({
            title: "¡Éxito!",
            text: response.message,
            timer: 3000,
            icon: "success"
          }).then(() => {
            window.location.reload();
          });
        },
        error => {
          Swal.fire({
            title: "Error",
            text: error.message,
            timer: 3000,
            icon: "error"
          });
          console.error(error);
        }
      );
    }
  }

  guardarusuariosinImagen() {
    this.usuarioService.actualizarUsuarioSinImagen(this.usuarioModificarSinImagen).subscribe(x => {
      Swal.fire({
        title: "Mensaje",
        text: x.message,
        timer: 3000,
        icon: "success"
      }).then(() => {
        window.location.reload();
      });
    }, error => {
      Swal.fire({
        title: "Mensaje",
        text: error.message,
        timer: 3000,
        icon: "error"
      });
      console.log(error);
    });
  }
}
