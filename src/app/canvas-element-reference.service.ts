import { Injectable, ElementRef, ViewChild, Input } from '@angular/core';
import { CanvasComponent } from './canvas/canvas.component';
import { CanvasMouseCoordinatesService } from './canvas-mouse-coordinates.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasElementReferenceService {

  private canvasReference : HTMLCanvasElement;
  private cx : CanvasRenderingContext2D;

  @Input() public width : number = 1000; 
  @Input() public height : number = 1000;

  constructor() { }

  initialiseCanvasReferences() {
    this.canvasReference = document.getElementsByTagName('canvas')[0];
    this.setCanvasSize(this.width, this.height);
    this.cx = this.canvasReference.getContext("2d");
  }

  getCanvasReference() {
    return document.getElementsByTagName('canvas')[0];
  }

  getCanvasContext() {
    return this.cx;
  }

  setCanvasSize(width: number, height: number) {
    this.canvasReference.width = width;
    this.canvasReference.height = height;
  }


}
