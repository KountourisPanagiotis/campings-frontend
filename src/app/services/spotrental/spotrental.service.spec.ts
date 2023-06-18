import { TestBed } from '@angular/core/testing';

import { SpotrentalService } from './spotrental.service';

describe('SpotrentalService', () => {
  let service: SpotrentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotrentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
