import { Injectable } from '@angular/core';

import { fromEvent } from 'rxjs';
import { takeUntil, switchMap, pairwise, finalize } from 'rxjs/operators';

import { HeroIcon } from './hero-icon';
import { MousePosition } from './mouse-position';

import { CanvasElementReferenceService } from './canvas-element-reference.service';
import { CanvasMouseCoordinatesService } from './canvas-mouse-coordinates.service';
import { HeroIconService } from './hero-icon.service';

@Injectable({
  providedIn: 'root'
})
export class DrawImageService {

  backgroundImage = new Image();

  private mousePosition : MousePosition;

  private pointPairs : Map<MousePosition, MousePosition>;
  private lineSave: Map<MousePosition, MousePosition>[];
  private drawSave: Map<MousePosition, MousePosition>[][];

  constructor(
    private _canvasRef : CanvasElementReferenceService,
    private _canvasMouseCoordinatesService : CanvasMouseCoordinatesService,
    private _heroIconService : HeroIconService
  ) { }

  initialise() {
    this.backgroundImage.src = "https://lh6.googleusercontent.com/WiYGbwNqZcvpI70JxfM8Z7K7PnQPML1NQZPS3_WPjPVHsI3eF6ZcoFEv0VleLECTG5KkpJZZottIFzGrkaCd=w1440-h826-rw";
    this.getMouseCoordinates();
  }

  // Moves hero icon if it is already on the canvas
  public moveHeroIcon() {
    // Gets the hero icons on canvas 
    let heroIcons = this._heroIconService.getHeroIconArray();
    let imageGrabbed: number = 0;

    // Moves canvas if the moues position is within the image borders
    heroIcons.forEach((image: HTMLImageElement, icon: HeroIcon) => {

      // Position verification
      if (icon.xPosition <= this.mousePosition.x &&
        this.mousePosition.x <= icon.xPosition + image.width &&
        icon.yPosition <= this.mousePosition.y &&
        this.mousePosition.y <= icon.yPosition + image.height) {

          // Prevents moving two icons simultaneously
          imageGrabbed++; //TEMPORARY FIX
          if (imageGrabbed > 1) {
            return;
          }
          
          // While the mouse is down and moving within canvas, move the icons
          // Cursor is exactly on the center of the icons
          this.updateSelectedIcon(heroIcons, icon, image);

        }

      });

    }

  public drawInk() {

    this.getMouseCoordinates();
    
    let ctx: CanvasRenderingContext2D = this._canvasRef.getCanvasContext();

    ctx.lineWidth = 5;
    ctx.lineJoin = ctx.lineCap = 'round';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgb(0, 0, 0)';

    fromEvent(this._canvasRef.getCanvasReference(), 'mousedown')
    .pipe(
      switchMap((e) => {
        // Registers mouse movement until the user stops holding down or leaves the canvas
        return fromEvent(this._canvasRef.getCanvasReference(), 'mousemove').pipe(
          takeUntil(fromEvent(this._canvasRef.getCanvasReference(), 'mouseup')),
          takeUntil(fromEvent(this._canvasRef.getCanvasReference(), 'mouseleave')),
          finalize(() => {
            
            if (this.drawSave === undefined) {
              this.drawSave = [];
            }

            this.lineSave.push(this.pointPairs);
            this.drawSave.push(this.lineSave);
            console.log(this.lineSave); 
            console.log(this.drawSave); 
            this.lineSave = [];
            this.pointPairs = new Map();
          }),
          pairwise()
        )
      })
    )
    .subscribe((res: [MouseEvent, MouseEvent]) => {
      const rect = this._canvasRef.getCanvasReference().getBoundingClientRect();

      // previous and current position with the offset
      const prevPos: MousePosition = {
        x: res[0].clientX - rect.left,
        y: res[0].clientY - rect.top
      };

      const currentPos: MousePosition = {
        x: res[1].clientX - rect.left,
        y: res[1].clientY - rect.top
      };
      if (this.pointPairs === undefined) {
        this.pointPairs = new Map();
      }

      this.pointPairs.set(prevPos, currentPos);

      if (this.lineSave === undefined) {
        this.lineSave = [];
      }
    
      // this method we'll implement soon to do the actual drawing
      this.drawOnCanvas(prevPos, currentPos);
    });
  }

  private drawOnCanvas(
    prevPos: MousePosition,
    currentPos: MousePosition
  ) {

    let ctx: CanvasRenderingContext2D = this._canvasRef.getCanvasContext();
    // incase the context is not set
    if (!ctx) { return; }
  
    // start our drawing path
    ctx.beginPath();
  
    // we're drawing lines so we need a previous position
    if (prevPos) {
      // sets the start point
      ctx.moveTo(prevPos.x, prevPos.y); // from
      // draws a line from the start pos until the current position
      ctx.lineTo(currentPos.x, currentPos.y);
  
      // strokes the current path with the styles we set earlier
      ctx.stroke();
    }
  }

  // Adds icon image onto the canvas
  public addHeroIconToCanvas(image: HTMLImageElement, icon: HeroIcon) {
    
    // Updates canvas with the added icon on it
    this.updateCanvas(this._heroIconService.getHeroIconArray(), icon, image);

  }  
  
  // Draws what ever is behind the selected icon
  drawBackground(heroIconArray: Map<HeroIcon, HTMLImageElement>) { //MAKE PRIVATE ONCE CANVAS.COMPONENT DOES NOT NEED IT ANYMORE

    // Draws map
    this._canvasRef.getCanvasContext().drawImage(this.backgroundImage, 0, 0);

    //Draws non-selected icons
    heroIconArray.forEach((image,icon) => {
      //this._canvasRef.getCanvasContext().drawImage(image, icon.xPosition, icon.yPosition);
      this.clipHeroIcon(heroIconArray, icon, image, false);
    });

    this.drawSave.forEach((array) => {

      array.forEach((stroke) => {

        stroke.forEach((prevPos, currentPos) => {

          this.drawOnCanvas(prevPos, currentPos);
        });
      });
    });

  }

  // Branches off from this.moveHeroIcon()
  private updateSelectedIcon(heroIcons: Map<HeroIcon, HTMLImageElement>, icon: HeroIcon, image: HTMLImageElement) {

    // Registers mouse movement until the user stops holding down or leaves the canvas
    fromEvent(this._canvasRef.getCanvasReference(), 'mousemove').pipe(
      takeUntil(fromEvent(this._canvasRef.getCanvasReference(), 'mouseup')),
      takeUntil(fromEvent(this._canvasRef.getCanvasReference(), 'mouseleave'))
    )
      .subscribe(() => {
        
        // Updates icon's positions so that its center is exactly on the cursor
        icon.xPosition = this.mousePosition.x - image.width/2;
        icon.yPosition = this.mousePosition.y - image.height/2;
        this.updateCanvas(heroIcons,icon,image);
    });
  }

  // Updates canvas
  private updateCanvas(heroIconArray: Map<HeroIcon, HTMLImageElement>, heroIconClass, heroIconImage) {

    // Returns if canvas context does not exist
    if (!this._canvasRef.getCanvasContext()) { return; } 

    // Draws background and selected icon
    this.clipHeroIcon(heroIconArray, heroIconClass, heroIconImage, true);
    
  }

  private clipHeroIcon(heroIconArray: Map<HeroIcon, HTMLImageElement>, heroIconClass: HeroIcon, heroIconImage: HTMLImageElement, withUnselectedIcons: boolean) {
    
    this._canvasRef.getCanvasContext().save();
    if (withUnselectedIcons) {

      this.drawBackground(heroIconArray);
    }

    this._canvasRef.getCanvasContext().beginPath();
    this._canvasRef.getCanvasContext().arc(heroIconClass.xPosition + heroIconImage.width/2, heroIconClass.yPosition + heroIconImage.height/2, 50, 0, 2 * Math.PI);
    this._canvasRef.getCanvasContext().lineWidth = 10;
    this._canvasRef.getCanvasContext().stroke(); //CAN BE USED FOR BORDERS
    
    this._canvasRef.getCanvasContext().clip();
    
    this._canvasRef.getCanvasContext().fillStyle = "white";
    this._canvasRef.getCanvasContext().fillRect(0,0, 1000, 1000);
    this._canvasRef.getCanvasContext().drawImage(heroIconImage, heroIconClass.xPosition, heroIconClass.yPosition);
    
    this._canvasRef.getCanvasContext().restore();
  }

  private getMouseCoordinates() {
    this._canvasMouseCoordinatesService.getMouseCoordinates()
    .subscribe((mousePos: MousePosition) => {
      this.mousePosition = mousePos;
    });
  }
}