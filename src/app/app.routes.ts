import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';

export const routes: Routes = [
    {
        path:'',
        component:LoginComponent,
        title:'login'
    },

    {
        path:'signup',
        component:RegisterComponent,
        title:'register'
    }
];
