import { Component, OnInit, inject } from '@angular/core';
import { MoviesService } from '../../Services/movies.service';
import { MoviesInterface } from '../../Interface/movies';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.css'
})
export class TrendingComponent  implements OnInit{

  moviesService = inject(MoviesService)
  trendingMovies:MoviesInterface[] = []

  ngOnInit(): void {
    this.moviesService.getTrendingMovies().subscribe(
      (movies:MoviesInterface[]) => {
        this.trendingMovies = movies
        console.log(movies)
      }, (error) => {
        console.error('error fetching trending movies: ', error)
      }
    )
  }
}
