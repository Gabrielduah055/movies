import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { HomeComponent } from './Pages/home/home.component';
import { MoviesComponent } from './Pages/movies/movies.component';
import { SeriesComponent } from './Pages/series/series.component';
import { BookmarkComponent } from './Pages/bookmark/bookmark.component';

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
    },

    {
        path:'home',
        component:HomeComponent,
        title:'Home'
    },

    {
        path:'movies',
        component:MoviesComponent,
        title:'Movies'
    },
    {
        path:'series',
        component:SeriesComponent,
        title:'Series'
    },
    {
        path:'bookmark',
        component:BookmarkComponent,
        title:'Bookmark'
    },
];
