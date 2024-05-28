import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { MovieListComponent } from '../../Components/movie-list/movie-list.component';
import { SearchBarComponent } from '../../Components/search-bar/search-bar.component';

import { MoviesService } from '../../Services/movies.service';
import { MoviesInterface } from '../../Interface/movies';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, MovieListComponent, SearchBarComponent,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  moviesService = inject(MoviesService)
  
  movies:MoviesInterface[] = [];



  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe(
      (data : MoviesInterface[]) => {
        this.movies = data;
        console.log(this.movies)
      },
      (error) => {
        console.error('Error fetching movies', error)
      }
    )
  }
}
