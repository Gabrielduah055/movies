import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MoviesInterface } from '../../Interface/movies';

import { BookmarkComponent } from './bookmark.component';

describe('BookmarkComponent', () => {
  let component: BookmarkComponent;
  let fixture: ComponentFixture<BookmarkComponent>;
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
      imports: [BookmarkComponent, HttpClientTestingModule , RouterTestingModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies on initialization', () => {
    expect(component.bookMarked.length).toBe(1);
    expect(component.filteredBookmarked.length).toBe(1);
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
    component.filterBookmarked();
    expect(component.filteredBookmarked.length).toBe(1);
    expect(component.filteredBookmarked[0].title).toBe('Movie 1');

    component.searchQuery = 'Movie';
    component.filterBookmarked();
    expect(component.filteredBookmarked.length).toBe(1);
  });

});
