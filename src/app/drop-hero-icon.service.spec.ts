import { TestBed, inject } from '@angular/core/testing';

import { DropHeroIconService } from './drop-hero-icon.service';

describe('DropHeroIconService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DropHeroIconService]
    });
  });

  it('should be created', inject([DropHeroIconService], (service: DropHeroIconService) => {
    expect(service).toBeTruthy();
  }));
});
