import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MoviesInterface } from '../../Interface/movies';
import { MoviesService } from '../../Services/movies.service';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent implements OnInit{

  movieService = inject(MoviesService);
  bookMarked:MoviesInterface[] = []
  filteredBookmarked:MoviesInterface[] = []
  searchQuery:string = ''


  ngOnInit(): void {
    this.movieService.getBookmarkMovies().subscribe({
      next:(movie:MoviesInterface[]) => {
        this.bookMarked = movie;
        this.filteredBookmarked = movie
      },
      error:(error) => console.log(error)
    })
  }

  filterBookmarked():void {
    this.filteredBookmarked = this.bookMarked.filter((movie) => 
    movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  }

  toggleBookmark(movie: MoviesInterface): void {
    movie.isBookmarked = !movie.isBookmarked; 

    if(movie.isBookmarked) {
      this.movieService.addBookmark(movie)
    } else {
      this.movieService.removeBookmark(movie.id);
      this.bookMarked = this.bookMarked.filter(m => m.id !== movie.id)
      this.filterBookmarked();
    }
  }
}
