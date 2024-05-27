import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoviesInterface } from '../Interface/movies';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private jsonUrl = 'assets/data.json';

  private http= inject(HttpClient)

  getMovies():Observable<MoviesInterface[]> {
    return this.http.get<MoviesInterface[]>(this.jsonUrl)
  }

}
