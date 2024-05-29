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

  ngOnInit(): void {
    this.moviesService.getAllMovies().subscribe(
      (movies:MoviesInterface[]) => {
        this.getMovies = movies
      }
    )
  }
  toggleBookmark(movie: MoviesInterface): void {
    movie.isBookmarked = !movie.isBookmarked; // Toggle the bookmark status
  }
}
