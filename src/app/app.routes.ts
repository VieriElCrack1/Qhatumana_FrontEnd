import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/auth.guard';
import { AuthenticationComponent } from './auth/authentication/authentication.component';

export const routes: Routes = [
    {path: "auth", component: AuthenticationComponent},
    {path: "dashboard", component: DashboardComponent, 
        canActivate: [authGuard]
        /*children: [
            //{path: "", component: ""}
        ]*/
    },
    {path: "", redirectTo: "auth", pathMatch: "full"},
    {path: "**", redirectTo: "auth"}
];
