import { TestBed } from '@angular/core/testing';

import { DetailsrecService } from './detailsrec.service';

describe('DetailsrecService', () => {
  let service: DetailsrecService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailsrecService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
