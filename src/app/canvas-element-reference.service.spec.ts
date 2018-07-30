import { TestBed, inject } from '@angular/core/testing';

import { CanvasElementReferenceService } from './canvas-element-reference.service';

describe('CanvasElementReferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanvasElementReferenceService]
    });
  });

  it('should be created', inject([CanvasElementReferenceService], (service: CanvasElementReferenceService) => {
    expect(service).toBeTruthy();
  }));
});
