import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { RegistroclienteComponent } from './dashboard/cliente/registrocliente/registrocliente.component';
import { HomeComponent } from './dashboard/home/home.component';
import { RegistropedidoComponent } from './dashboard/pedido/registropedido/registropedido.component';
import { ProductoComponent } from './dashboard/producto/producto.component';
import { RegistrarComponent } from './dashboard/pago/registrarpago/registrarpago.component';
import { ConsultarclienteComponent } from './dashboard/cliente/consultarcliente/consultarcliente.component';
import { ConsultarpedidoComponent } from './dashboard/pedido/consultarpedido/consultarpedido.component';
import { ConsultarpagoComponent } from './dashboard/pago/consultarpago/consultarpago.component';

export const routes: Routes = [
    {path: "auth", component: AuthenticationComponent},
    {path: "dashboard", component: DashboardComponent, 
        canActivate: [authGuard],
        children: [
            {path: "home", component: HomeComponent},
            {path: "cliente/registrar", component: RegistroclienteComponent},
            {path: "cliente/consulta", component: ConsultarclienteComponent},
            {path: "pedido/registrar", component: RegistropedidoComponent},
            {path: "pedido/consulta", component: ConsultarpedidoComponent},
            {path: "producto/listado", component: ProductoComponent},
            {path: "pagopedido/registrar", component: RegistrarComponent},
            {path: "pagopedido/consultar", component: ConsultarpagoComponent}
        ]
    },
    {path: "", redirectTo: "auth", pathMatch: "full"},
    {path: "**", redirectTo: "auth"}
];
