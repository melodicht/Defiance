import { TestBed, inject } from '@angular/core/testing';

import { CanvasMouseCoordinatesService } from './canvas-mouse-coordinates.service';

describe('CanvasMouseCoordinatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanvasMouseCoordinatesService]
    });
  });

  it('should be created', inject([CanvasMouseCoordinatesService], (service: CanvasMouseCoordinatesService) => {
    expect(service).toBeTruthy();
  }));
});
