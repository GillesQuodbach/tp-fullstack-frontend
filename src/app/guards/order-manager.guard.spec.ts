import { TestBed } from '@angular/core/testing';

import { OrderManagerGuard } from './order-manager.guard';

describe('OrderManagerGuard', () => {
  let guard: OrderManagerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OrderManagerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
