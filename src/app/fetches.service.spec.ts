import { TestBed } from '@angular/core/testing';

import { FetchesService } from './fetches.service';

describe('FetchesService', () => {
  let service: FetchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
