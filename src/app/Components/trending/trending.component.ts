import { Component, OnInit, inject, ViewChild, ElementRef, AfterViewInit, Input} from '@angular/core';
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

  @ViewChild('scrollContainer') scrollContainer! : ElementRef;

  

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

  ngAfterViewInit(): void {
    this.scrollContainer.nativeElement.addEventListener('wheel', (event: WheelEvent) => {
      event.preventDefault();
      if (event.deltaY > 0) {
        this.scrollContainer.nativeElement.scrollLeft += 100;
      } else {
        this.scrollContainer.nativeElement.scrollLeft -= 100;
      }
    });
  }
}
