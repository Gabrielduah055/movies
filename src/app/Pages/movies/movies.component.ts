import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../Components/search-bar/search-bar.component';
import { MoviesInterface } from '../../Interface/movies';
import { MoviesService } from '../../Services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [SidebarComponent, SearchBarComponent, CommonModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movieService = inject(MoviesService);
  moviesGenre: MoviesInterface[] = [];

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (movie: MoviesInterface[]) => {
        this.moviesGenre = movie;
        console.log(movie);
      },
      error: (error) => console.log(error),
    });
  }
}
