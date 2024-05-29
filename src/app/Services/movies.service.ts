import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviesInterface } from '../Interface/movies';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private jsonUrl = 'assets/data.json';

  private http= inject(HttpClient)

  getAllMovies():Observable<MoviesInterface[]> {
    return this.http.get<MoviesInterface[]>(this.jsonUrl)
  }

  getTrendingMovies(): Observable<MoviesInterface[]> {
    return this.http.get<MoviesInterface[]>(this.jsonUrl).pipe(
      map(movies => movies.filter(movie => movie.isTrending))
    )
  }

  getMovies():Observable<MoviesInterface[]> {
    return this.http.get<MoviesInterface[]>(this.jsonUrl).pipe(
      map(movies => movies.filter(movie => movie.category === 'Movie'))
    )
  }

  getSeris():Observable<MoviesInterface[]> {
    return this.http.get<MoviesInterface[]>(this.jsonUrl).pipe(
      map(movies => movies.filter(movie => movie.category ==='TV Series'))
    )
  }
  
}
