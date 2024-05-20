import { TestBed } from '@angular/core/testing';

import { NextRouteService } from './next-route.service';

describe('NextRouteService', () => {
  let service: NextRouteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NextRouteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
