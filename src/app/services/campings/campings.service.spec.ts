import { TestBed } from '@angular/core/testing';

import { CampingsService } from './campings.service';

describe('CampingsService', () => {
  let service: CampingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
