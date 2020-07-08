import { TestBed } from '@angular/core/testing';

import { GetListOfDataService } from './get-list-of-data.service';

describe('GetListOfDataService', () => {
  let service: GetListOfDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetListOfDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
