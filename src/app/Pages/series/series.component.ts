import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { SearchBarComponent } from '../../Components/search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { MoviesInterface } from '../../Interface/movies';
import { MoviesService } from '../../Services/movies.service';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [SidebarComponent, SearchBarComponent, CommonModule],
  templateUrl: './series.component.html',
  styleUrl: './series.component.css'
})
export class SeriesComponent implements OnInit{
  movieService = inject(MoviesService);
  series : MoviesInterface[] = []

  ngOnInit(): void {
    
    this.movieService .getSeris().subscribe(
      (movie:MoviesInterface[]) => {
        this.series = movie;
        console.log(movie)
      }, (error) => {
          console.log(error)
      });
  }

}
