import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';

import { CanvasElementReferenceService } from '../canvas-element-reference.service';
import { DrawImageService } from '../draw-image.service';
import { HeroIconService } from '../hero-icon.service';

@Component({
  selector: 'app-canvas',
  template: '<canvas #canvas appDragDrop></canvas>',
  styles: ['canvas { border: 1px solid #000; }'],
  providers: [ 
    CanvasElementReferenceService,
    DrawImageService ]
})
export class CanvasComponent implements OnInit, AfterContentInit, AfterViewInit {

  constructor(
    private _canvasRef : CanvasElementReferenceService,
    private _drawImageService : DrawImageService,
    private _heroIconService : HeroIconService
  ) {}

  ngOnInit() {

    this._canvasRef.initialiseCanvasReferences();

    this._drawImageService.initialise();//Won't be necessary once images can be chosen
  }

  ngAfterContentInit() {
    
  }

  ngAfterViewInit() {
    
    setTimeout(() => {
      this._drawImageService.drawBackground(this._heroIconService.getHeroIconArray())
    }, 1000); //Won't be necessary once images can be chosen

    this.moveHeroIcon();
  }

  // Moves selected hero icon once the mouse is down
  private moveHeroIcon() {
    fromEvent(this._canvasRef.getCanvasReference(), 'mousedown')
      .subscribe((res: MouseEvent) => {
        this._drawImageService.moveHeroIcon();
      });
  } 

}
