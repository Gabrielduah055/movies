import { Component, OnInit, inject } from '@angular/core';
import { MoviesInterface } from '../../Interface/movies';
import { MoviesService } from '../../Services/movies.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recommend',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recommend.component.html',
  styleUrl: './recommend.component.css'
})
export class RecommendComponent implements OnInit{

  moviesService = inject(MoviesService)
  getMovies:MoviesInterface[] = []
  bookMarked:MoviesInterface[] = []

  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe(
      (movies:MoviesInterface[]) => {
        this.getMovies = movies
      }
    );

    this.moviesService.getBookmarkMovies().subscribe(
      (bookMarkedMovies:MoviesInterface[]) => {
        this.bookMarked = bookMarkedMovies
      }
    )
  }

  isbookMarked(movie:MoviesInterface):boolean {
    return this.bookMarked.some(m => m.id === movie.id)
  }


  toggleBookmark(movie: MoviesInterface): void {
    movie.isBookmarked = !movie.isBookmarked; // Toggle the bookmark status

    if(movie.isBookmarked) {
      this.moviesService.addBookmark(movie)
    } else {
      this.moviesService.removeBookmark(movie.id);
    }
  }
}
