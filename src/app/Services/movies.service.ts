import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { MoviesInterface } from '../Interface/movies';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  public jsonUrl = 'assets/data.json';
  private bookmarkKey = 'bookmarkedMovies';
  private http = inject(HttpClient);

  private saveBookmarksToLocalStorage(bookmarkedMovies: MoviesInterface[]): void {
    localStorage.setItem(this.bookmarkKey, JSON.stringify(bookmarkedMovies));
  }

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
      map(movies => {
        const localBookmarks = this.getBookMarksFromLocalStorage() || [];
        return movies.map(movie => ({
          ...movie,
          isBookmarked: localBookmarks.some(b => b.id === movie.id)
        })).filter(movie => movie.category === 'Movie');
      })
    );
  }

  getSeris(): Observable<MoviesInterface[]> {
    return this.http.get<MoviesInterface[]>(this.jsonUrl).pipe(
      map(movies => {
        const localBookmarks = this.getBookMarksFromLocalStorage() || [];
        return movies.map(movie => ({
          ...movie,
          isBookmarked: localBookmarks.some(b => b.id === movie.id)
        })).filter(movie => movie.category === 'TV Series');
      })
    );
  }


  getBookmarkMovies():Observable<MoviesInterface[]> {
    const localBookmarks = this.getBookMarksFromLocalStorage();
    if(localBookmarks) {
      return of(localBookmarks)
    }
    return this.http.get<MoviesInterface[]>(this.jsonUrl).pipe(
      map(movies => {
        const bookmarkedMovies = movies.filter(movie => movie.isBookmarked);
        this.saveBookmarksToLocalStorage(bookmarkedMovies);
        return bookmarkedMovies;
      })
    )
  }


  private getBookMarksFromLocalStorage():MoviesInterface[] | null {
    const bookmarks = localStorage.getItem(this.bookmarkKey);
    return bookmarks ? JSON.parse(bookmarks) : null;
  }

  addBookmark(movie:MoviesInterface):void {
    const currentBookmarks = this.getBookMarksFromLocalStorage() || [];
    if(!currentBookmarks.some(b => b.id === movie.id)) {
      currentBookmarks.push(movie);
      this.saveBookmarksToLocalStorage(currentBookmarks);
    }
  }
  
  removeBookmark(movieId:number):void{
    let currentBookmarks = this.getBookMarksFromLocalStorage() || [];
    const updatedBookmarks = currentBookmarks.filter(movie => movie.id !== movieId);
    this.saveBookmarksToLocalStorage(updatedBookmarks)
  
  }
}
