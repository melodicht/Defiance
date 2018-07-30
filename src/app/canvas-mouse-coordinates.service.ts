import { Injectable } from '@angular/core';
import { Component, Input, ElementRef, OnInit, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { Observable, of, Subscription } from '../../node_modules/rxjs';
import { MousePosition } from './mouse-position';
import { CanvasElementReferenceService } from './canvas-element-reference.service';

@Injectable({
  providedIn: 'root'
})
export class CanvasMouseCoordinatesService implements OnInit {
  
  public mousePosition : MousePosition;
  mouseSubscription : Subscription;

  constructor(private _canvasRef : CanvasElementReferenceService) { }

  ngOnInit() {
    
  }

  initialise() {
    console.log("this.mousePosition Initialised!");
    this.mousePosition = {
      x: 0,
      y: 0
    };
  }

  canvasMouseCoordinates(): void {
    fromEvent(this._canvasRef.getCanvasReference(), 'mousemove')
      .subscribe((res: MouseEvent) => {
        const rect = this._canvasRef.getCanvasReference().getBoundingClientRect();

        const MOUSEPOS = {
          x: res.clientX - rect.left,
          y: res.clientY - rect.top
        }

        this.mousePosition = MOUSEPOS;
      })
  }

  setCanvasMouseCoordinates(res: MouseEvent) {
    

  }

  getCanvasMouseCoordinates(): MousePosition {
    return this.mousePosition;
  }
}
