import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesInterface } from '../../Interface/movies';
import { MoviesService } from '../../Services/movies.service';

import { SeriesComponent } from './series.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('SeriesComponent', () => {
  let component: SeriesComponent;
  let fixture: ComponentFixture<SeriesComponent>;
  let movies: MoviesInterface[] = [
    {
      id: 1,
      title: 'Movie 1',
      thumbnail: {
        trending: { small: '', large: '' },
        regular: { small: '', medium: '', large: '' },
      },
      year: 2021,
      category: 'Movie',
      rating: 'PG-13',
      isBookmarked: false,
      isTrending: false,
    },
    {
      id: 2,
      title: 'Movie 2',
      thumbnail: {
        trending: { small: '', large: '' },
        regular: { small: '', medium: '', large: '' },
      },
      year: 2021,
      category: 'Movie',
      rating: 'PG-13',
      isBookmarked: true,
      isTrending: false,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesComponent, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on initialization', () => {
    expect(component.series.length).toBe(0);
    expect(component.filteredSeries.length).toBe(0);
  });

  it('should fetch bookmarked movies on initialization', () => {
    expect(component.bookMarked.length).toBe(0);
  });

  it('should filter movies based on search query', () => {
    component.searchQuery = 'Series 1';
    component.filterMovies();
    expect(component.filteredSeries.length).toBe(0);
    

    component.searchQuery = 'Series 1';
    component.filterMovies();
    expect(component.filteredSeries.length).toBe(0);
  });
});
