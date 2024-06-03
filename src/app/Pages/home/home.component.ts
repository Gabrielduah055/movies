import { Component, OnInit, inject } from '@angular/core';
import { MoviesInterface } from '../../Interface/movies';
import { MoviesService } from '../../Services/movies.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  movieService = inject(MoviesService);
  getMovies: MoviesInterface[] = [];
  filteredMovies: MoviesInterface[] = [];

  searchQuery: string = '';

  ngOnInit(): void {
    this.movieService.getAllMovies().subscribe({
      next: (movies: MoviesInterface[]) => {
        this.getMovies = movies;
        this.filteredMovies = movies;
      },
      error: (error) => console.log(error),
    });
  }

  toggleBookmark(movie: MoviesInterface): void {
    movie.isBookmarked = !movie.isBookmarked; // Toggle the bookmark status

    if(movie.isBookmarked) {
      this.movieService.addBookmark(movie)
    } else {
      this.movieService.removeBookmark(movie.id);
    }
  }

  filterMovies(): void {
    this.filteredMovies = this.getMovies.filter(movie =>
      movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
}
