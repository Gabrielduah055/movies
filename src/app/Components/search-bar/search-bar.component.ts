import { Component, EventEmitter, output } from '@angular/core';
import { MoviesService } from '../../Services/movies.service';
import { HomeComponent } from '../../Pages/home/home.component';
import { SeriesComponent } from '../../Pages/series/series.component';
import { MoviesComponent } from '../../Pages/movies/movies.component';
import { BookmarkComponent } from '../../Pages/bookmark/bookmark.component';


@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [MoviesComponent, HomeComponent, BookmarkComponent, SeriesComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  




}
