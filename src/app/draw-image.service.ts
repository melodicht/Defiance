import { Injectable } from '@angular/core';

import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private _canvasRef : CanvasElementReferenceService,
    private _canvasMouseCoordinatesService : CanvasMouseCoordinatesService,
    private _heroIconService : HeroIconService
  ) { }

  initialise() {
    this.backgroundImage.src = "https://lh6.googleusercontent.com/K3jTa6uWEJPNiYOdWHD0O2TULRv5vicsqeQvCgxS6K0zta5vI8P_onk6l0UyPy0yjvhoyd_okQuTgG-6OAWR=w1440-h826-rw";
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
      this._canvasRef.getCanvasContext().drawImage(image, icon.xPosition, icon.yPosition);
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
    this.drawBackground(heroIconArray);
    this._canvasRef.getCanvasContext().drawImage(heroIconImage, heroIconClass.xPosition, heroIconClass.yPosition);

  }

  private getMouseCoordinates() {
    this._canvasMouseCoordinatesService.getMouseCoordinates()
    .subscribe((mousePos: MousePosition) => {
      this.mousePosition = mousePos;
    });
  }
}