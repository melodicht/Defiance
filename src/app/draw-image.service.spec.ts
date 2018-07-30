import { TestBed, inject } from '@angular/core/testing';

import { DrawImageService } from './draw-image.service';

describe('DrawImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DrawImageService]
    });
  });

  it('should be created', inject([DrawImageService], (service: DrawImageService) => {
    expect(service).toBeTruthy();
  }));
});
