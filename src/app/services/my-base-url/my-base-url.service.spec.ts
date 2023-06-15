import { TestBed } from '@angular/core/testing';

import { MyBaseUrlService } from './my-base-url.service';

describe('MyBaseUrlService', () => {
  let service: MyBaseUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyBaseUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
