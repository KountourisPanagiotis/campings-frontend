import { TestBed } from '@angular/core/testing';

import { EmplacementService } from './emplacement.service';

describe('EmplacementService', () => {
  let service: EmplacementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmplacementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
