import { Component, Input, ElementRef, OnInit, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';
import { fromEvent } from 'rxjs';
import { switchMap, takeUntil, pairwise } from 'rxjs/operators';
import { CanvasMouseCoordinatesService } from '../canvas-mouse-coordinates.service';

import { MousePosition } from '../mouse-position';
import { CanvasElementReferenceService } from '../canvas-element-reference.service';
import { DrawImageService } from '../draw-image.service';
import { HeroIconService } from '../hero-icon.service';

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas appDragDrop></canvas>',
  styles: ['canvas { border: 1px solid #000; }'],
  providers: [ 
    CanvasMouseCoordinatesService, 
    CanvasElementReferenceService,
    DrawImageService ]
})
export class CanvasComponent implements OnInit, AfterContentInit, AfterViewInit {

  // defining canvas' width and height 

  constructor(
    private _canvasMouseCoordinates : CanvasMouseCoordinatesService,
    private _canvasRef : CanvasElementReferenceService,
    private _drawImageService : DrawImageService,
    private _heroIconService : HeroIconService
  ) {}

  ngOnInit() {
    // get context

    this._canvasRef.initialiseCanvasReferences();

    this._canvasMouseCoordinates.initialise();
    
    this._canvasMouseCoordinates.canvasMouseCoordinates();

    this._drawImageService.initialise();
  }

  ngAfterContentInit() {
    
  }

  ngAfterViewInit() {
    
    setTimeout(() => {
      this._drawImageService.drawBackground(this._heroIconService.getHeroIconArray())
    }, 1000);

    this.mouseDownCoordinates();
  }

  private mouseDownCoordinates() {
    fromEvent(this._canvasRef.getCanvasReference(), 'mousedown')
      .subscribe((res: MouseEvent) => {
        this._drawImageService.drawHeroIcon();
      });
  } 

}
