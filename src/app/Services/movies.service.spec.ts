import { TestBed } from '@angular/core/testing';

import { MoviesService } from './movies.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { MoviesInterface } from '../Interface/movies';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[MoviesService]
    });
    service = TestBed.inject(MoviesService);
    httpTestingController = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllMovies should return an array of movies', () => {
    const mockMovies:MoviesInterface[] = [ 
      {
        id: 1,
        title: '',
        thumbnail: {
          trending: {
            small: '',
            large: ''
          },
          regular: {
            small: '',
            medium: '',
            large: ''
          }
        },
        year: 0,
        category: '',
        rating: '',
        isBookmarked: false,
        isTrending: false
      }
    ]
    service.getAllMovies().subscribe(movies => {
      expect(movies.length).toBe(1);
      expect(movies).toEqual(mockMovies)
    });

    const req = httpTestingController.expectOne(service.jsonUrl);
    expect (req.request.method).toEqual('GET');
    req.flush(mockMovies);
  })


  it('getTrendingMovies should return an array of trending movies', () => {
    const mockTredingMovies :MoviesInterface[] = [
      {
          id: 1,
          title: '',
          thumbnail: {
            trending: {
              small: '',
              large: ''
            },
            regular: {
              small: '',
              medium: '',
              large: ''
            }
          },
          year: 0,
          category: '',
          rating: '',
          isBookmarked: false,
          isTrending: false
      },
      {
          id: 1,
          title: '',
          thumbnail: {
            trending: {
              small: '',
              large: ''
            },
            regular: {
              small: '',
              medium: '',
              large: ''
            }
          },
          year: 0,
          category: '',
          rating: '',
          isBookmarked: false,
          isTrending: true
      }
    ];
    service.getTrendingMovies().subscribe(movies => {
      expect(movies.length).toBe(1)
      expect(movies).toEqual([mockTredingMovies[1]]);
    });

    const req = httpTestingController.expectOne(service.jsonUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(mockTredingMovies)
  })
});


