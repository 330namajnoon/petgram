import { TestBed } from '@angular/core/testing';

import { StorysViewService } from './storys-view.service';

describe('StorysViewService', () => {
  let service: StorysViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorysViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
