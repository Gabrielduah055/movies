import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { MoviesInterface } from '../../Interface/movies';
import { MoviesService } from '../../Services/movies.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [SidebarComponent,  CommonModule, FormsModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit{
  movieService = inject(MoviesService);
  series : MoviesInterface[] = []
  filteredSeries: MoviesInterface[] =[]
  searchQuery:string = ''

  ngOnInit(): void {
    
    this.movieService .getSeris().subscribe({
      next:(movie:MoviesInterface[]) => {
        this.series = movie;
        this.filteredSeries = movie
      } ,
      error:(error) => console.log(error)
    }
    )
  }

  filterMovies(): void {
    this.filteredSeries = this.series.filter((movie) => 
      movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
    )
  }

  toggleBookmark(movie: MoviesInterface): void {
    movie.isBookmarked = !movie.isBookmarked; // Toggle the bookmark status

    if(movie.isBookmarked) {
      this.movieService.addBookmark(movie)
    } else {
      this.movieService.removeBookmark(movie.id);
    }
  }

}
