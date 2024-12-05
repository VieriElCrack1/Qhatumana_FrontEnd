import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, RouterOutlet } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit ,OnInit {

  menu : any[] = [];
  rutaPadre = "/dashboard";

  constructor(private authService : AuthService, private router : Router, private el: ElementRef,
              private dashService : DashboardService) {}

  ngAfterViewInit(): void {
    const listItem = this.el.nativeElement.querySelector(".navigation li");

    if (listItem) {
      listItem.addEventListener("mouseover", function(this: HTMLElement) {
        this.classList.add("hovered");
      });

      listItem.addEventListener("mouseout", function(this: HTMLElement) {
        this.classList.remove("hovered");
      });
    }

    const toggle = document.querySelector(".toggle");
    const navigation = document.querySelector(".navigation");
    const main = document.querySelector(".main");

    if (toggle && navigation && main) {
      toggle.addEventListener("click", function () {
        navigation.classList.toggle("active");
        main.classList.toggle("active");
      });
    }

    const menuUsuarios = document.querySelector('.menu-usuarios > a');
    if (menuUsuarios) {
      menuUsuarios.addEventListener('click', function (event) {
        event.preventDefault();
        const submenu = document.querySelector('.menu-usuarios .submenu');
        if (submenu) {
          submenu.classList.toggle('visible');
        }
      });
    }

    const menuItems = document.querySelectorAll('.menu > li');
    menuItems.forEach(item => {
      item.addEventListener('click', function () {
        
        const todosSubmenu = document.querySelectorAll('.submenu');
        todosSubmenu.forEach(submenu => submenu.classList.remove('visible'));

        
        const submenu = item.querySelector('.submenu');
        if (submenu) {
          submenu.classList.toggle('visible');
        }
      });
    });
  }

  activarSubmenu(index: any): void {
    this.menu[index].isVisible = !this.menu[index].isVisible;
  }

  ngOnInit() : void {
    this.dashService.dashboardDatos().subscribe(
      x => {
        this.menu = x.USUARIO;
        this.menu = Object.values(x.ENLACES);
        console.log("Prueba Menu: ", this.menu);
      }, error => {
        console.error('Error al cargar el menu:', error);
      }
    );
  }

  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(["/auth"]);
  }
}
