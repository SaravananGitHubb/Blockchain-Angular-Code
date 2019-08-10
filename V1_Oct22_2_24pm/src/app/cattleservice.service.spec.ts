import { TestBed } from '@angular/core/testing';

import { CattleserviceService } from './cattleservice.service';

describe('CattleserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CattleserviceService = TestBed.get(CattleserviceService);
    expect(service).toBeTruthy();
  });
});
