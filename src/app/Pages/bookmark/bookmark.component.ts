import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../Components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

import { MoviesInterface } from '../../Interface/movies';
import { MoviesService } from '../../Services/movies.service';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [SidebarComponent, SearchBarComponent, CommonModule],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent implements OnInit{

  movieService = inject(MoviesService);
  bookMarked:MoviesInterface[] = []


  ngOnInit(): void {
    this.movieService.getBookmarkMovies().subscribe(
      (movies:MoviesInterface[]) => {
        this.bookMarked = movies;
        console.log(movies)
      }, (error) => {
        console.log(error)
      })
  }

  toggleBookmark(movie: MoviesInterface): void {
    movie.isBookmarked = !movie.isBookmarked; // Toggle the bookmark status

    if(movie.isBookmarked) {
      this.movieService.addBookmark(movie)
    } else {
      this.movieService.removeBookmark(movie.id);
      this.bookMarked = this.bookMarked.filter(m => m.id !== movie.id)
    }
  }
}
