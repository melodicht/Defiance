import { TestBed, inject } from '@angular/core/testing';

import { HeroIconService } from './hero-icon.service';

describe('HeroIconService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroIconService]
    });
  });

  it('should be created', inject([HeroIconService], (service: HeroIconService) => {
    expect(service).toBeTruthy();
  }));
});
