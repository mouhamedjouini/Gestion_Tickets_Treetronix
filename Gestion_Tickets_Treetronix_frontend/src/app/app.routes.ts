import { Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardUserComponent } from './dashboard-user/dashboard-user.component';
import { LoginComponent } from './login/login.component';

import { RegisterComponent } from './register/register.component';
import { ListRecComponent } from './dashboard-user/list-rec/list-rec.component';
import { AddRecComponent } from './dashboard-user/add-rec/add-rec.component';

export const routes: Routes = [
    { path: 'dashboardAdmin', component: DashboardAdminComponent },
    { path: 'dashboardUser', component: DashboardUserComponent , children:[
     
        {path: 'List-Reclamation', component:ListRecComponent},
        {path: 'add-Reclamation', component:AddRecComponent}]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {path: '', redirectTo:'login', pathMatch: 'full'},
    
];
