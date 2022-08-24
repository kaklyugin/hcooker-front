import { TestBed } from '@angular/core/testing';

import { CurrentOrderService } from './current-order.service';

describe('CurrentOrderService', () => {
  let service: CurrentOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
