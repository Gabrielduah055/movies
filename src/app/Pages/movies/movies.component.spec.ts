import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';


import { MoviesComponent } from './movies.component';
import { MoviesService } from '../../Services/movies.service';
import { MoviesInterface } from '../../Interface/movies';
import { RouterTestingModule } from '@angular/router/testing';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesService: MoviesService;
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
      imports: [MoviesComponent, HttpClientTestingModule , RouterTestingModule],
      providers: [{
        provide: MoviesService,
        useValue: {
          getMovies: () => of(movies),
          getBookmarkMovies: () => of(movies.filter(movie => movie.isBookmarked)),
          addBookmark: jasmine.createSpy('addBookmark'),
          removeBookmark: jasmine.createSpy('removeBookmark')
        }
      }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on initialization', () => {
    expect(component.moviesGenre.length).toBe(2);
    expect(component.filteredMovies.length).toBe(2);
  });

  it('should fetch bookmarked movies on initialization', () => {
    expect(component.bookMarked.length).toBe(1);
  });

  it('should toggle bookmark status correctly', () => {
    const movieToBookmark = movies[0];
    const movieToUnbookmark = movies[1];

    component.toggleBookmark(movieToBookmark);
    expect(component.bookMarked).toContain(movieToBookmark);

    component.toggleBookmark(movieToUnbookmark);
    expect(component.bookMarked).not.toContain(movieToUnbookmark);
  });

  it('should filter movies based on search query', () => {
    component.searchQuery = 'Movie 1';
    component.filterMovies();
    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toBe('Movie 1');

    component.searchQuery = 'Movie';
    component.filterMovies();
    expect(component.filteredMovies.length).toBe(2);
  });
});
