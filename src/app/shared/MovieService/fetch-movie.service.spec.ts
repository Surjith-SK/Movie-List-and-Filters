import { TestBed } from '@angular/core/testing';

import { FetchMovieService } from './fetch-movie.service';

describe('FetchMovieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FetchMovieService = TestBed.get(FetchMovieService);
    expect(service).toBeTruthy();
  });
});
