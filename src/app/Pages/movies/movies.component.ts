import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { MoviesInterface } from '../../Interface/movies';
import { MoviesService } from '../../Services/movies.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  movieService = inject(MoviesService);
  moviesGenre: MoviesInterface[] = [];
  filteredMovies: MoviesInterface[]=[];

  searchQuery:string = '';

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (movie: MoviesInterface[]) => {
        this.moviesGenre = movie;
        this.filteredMovies = movie;
        console.log(movie);
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
    this.filteredMovies = this.moviesGenre.filter((movie) => 
      movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  }

  
 
}
