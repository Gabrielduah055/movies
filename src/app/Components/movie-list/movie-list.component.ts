import { Component } from '@angular/core';
import { TrendingComponent } from '../trending/trending.component';
import { RecommendComponent } from '../recommend/recommend.component';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [TrendingComponent, RecommendComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {

}
