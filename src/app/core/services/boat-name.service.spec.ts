import { TestBed } from '@angular/core/testing';

import { BoatNameService } from './boat-name.service';

describe('BoatNameService', () => {
  let service: BoatNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoatNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
