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

  bookMarked: MoviesInterface[] = [];


  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (movie: MoviesInterface[]) => {
        this.moviesGenre = movie;
        this.filteredMovies = movie;
        console.log(movie);
      },
      error: (error) => console.log(error),
    });
    this.movieService.getBookmarkMovies().subscribe(
      (bookMarkedMovies:MoviesInterface[]) => {
        this.bookMarked = bookMarkedMovies
      }
    )
    
  }

  isbookMarked(movie:MoviesInterface):boolean {
    return this.bookMarked.some(m => m.id === movie.id)
  }
 

  toggleBookmark(movie: MoviesInterface): void {
    if(this.isbookMarked(movie)) {
      this.movieService.removeBookmark(movie.id);
      this.bookMarked = this.bookMarked.filter(m => m.id !== movie.id)
    } else {
      this.movieService.addBookmark(movie);
      this.bookMarked.push(movie)
    }
  }

  filterMovies(): void {
    this.filteredMovies = this.moviesGenre.filter((movie) => 
      movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  }

  
 
}
