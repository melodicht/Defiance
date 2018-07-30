import { Injectable } from '@angular/core';
import { Component, Input, ElementRef, OnInit, AfterContentInit, AfterViewInit, ViewChild } from '@angular/core';

import { fromEvent, from } from 'rxjs';
import { Observable, of, Subscription } from '../../node_modules/rxjs';
import { map } from "rxjs/operators";

import { CanvasElementReferenceService } from './canvas-element-reference.service';
import { MousePosition } from './mouse-position';

@Injectable({
  providedIn: 'root'
})
export class CanvasMouseCoordinatesService implements OnInit {

  private mousePositionArray: MousePosition[];
  private mousePosition: MousePosition;

  constructor(private _canvasRef : CanvasElementReferenceService) { }

  ngOnInit() {
    
  }

  getMouseCoordinates(): Observable<MousePosition> {
    return fromEvent(this._canvasRef.getCanvasReference(), 'mousemove')
    .pipe(
      map((res: MouseEvent) => {
        const rect = this._canvasRef.getCanvasReference().getBoundingClientRect();

        const MOUSEPOS: MousePosition = {
          x: res.clientX - rect.left,
          y: res.clientY - rect.top
        };

        return MOUSEPOS;
      })
    )
    
  }

}
