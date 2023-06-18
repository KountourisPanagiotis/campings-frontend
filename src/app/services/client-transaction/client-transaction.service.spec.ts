import { TestBed } from '@angular/core/testing';

import { ClientTransactionService } from './client-transaction.service';

describe('ClientTransactionService', () => {
  let service: ClientTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
