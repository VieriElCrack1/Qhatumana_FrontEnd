import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { RegistroclienteComponent } from './dashboard/cliente/registrocliente/registrocliente.component';
import { HomeComponent } from './dashboard/home/home.component';

export const routes: Routes = [
    {path: "auth", component: AuthenticationComponent},
    {path: "dashboard", component: DashboardComponent, 
        canActivate: [authGuard],
        children: [
            {path: "home", component: HomeComponent},
            {path: "cliente/registrar", component: RegistroclienteComponent}
        ]
    },
    {path: "", redirectTo: "auth", pathMatch: "full"},
    {path: "**", redirectTo: "auth"}
];
