import { Injectable, Input, ElementRef, AfterContentInit, AfterViewInit, ViewChild, HostListener } from '@angular/core';

import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { HeroIcon} from './hero-icon';

import { CanvasElementReferenceService } from './canvas-element-reference.service';
import { CanvasMouseCoordinatesService } from './canvas-mouse-coordinates.service';
import { HeroIconService } from './hero-icon.service';

@Injectable({
  providedIn: 'root'
})
export class DrawImageService implements AfterViewInit {

  backgroundImage = new Image();

  constructor(
    private _canvasRef : CanvasElementReferenceService,
    private _canvasMouseCoordinates : CanvasMouseCoordinatesService,
    private _heroIconService : HeroIconService
  ) { }

  initialise() {
    this.backgroundImage.src = "https://lh6.googleusercontent.com/K3jTa6uWEJPNiYOdWHD0O2TULRv5vicsqeQvCgxS6K0zta5vI8P_onk6l0UyPy0yjvhoyd_okQuTgG-6OAWR=w1440-h826-rw";
  }

  ngAfterViewInit() {

  }

  updateCanvas(heroIconArray: Map<HeroIcon, HTMLImageElement>, heroIconClass, heroIconImage) {
    if (!this._canvasRef.getCanvasContext()) { return; }

    this.drawBackground(heroIconArray);
    this._canvasRef.getCanvasContext().drawImage(heroIconImage, heroIconClass.xPosition, heroIconClass.yPosition);
  }

  drawBackground(heroIconArray: Map<HeroIcon, HTMLImageElement>) {
    this._canvasRef.getCanvasContext().drawImage(this.backgroundImage, 0, 0);
    heroIconArray.forEach((image,icon) => {
      this._canvasRef.getCanvasContext().drawImage(image, icon.xPosition, icon.yPosition);
    });
  }

  drawHeroIcon() {
    let heroIcons = this._heroIconService.getHeroIconArray();
    heroIcons.forEach((image,icon) => {
      if (icon.xPosition <= this._canvasMouseCoordinates.mousePosition.x &&
        this._canvasMouseCoordinates.mousePosition.x <= icon.xPosition + image.width &&
        icon.yPosition <= this._canvasMouseCoordinates.mousePosition.y &&
        this._canvasMouseCoordinates.mousePosition.y <= icon.yPosition + image.height) {
          
          fromEvent(this._canvasRef.getCanvasReference(), 'mousemove').pipe(
            takeUntil(fromEvent(this._canvasRef.getCanvasReference(), 'mouseup')),
            takeUntil(fromEvent(this._canvasRef.getCanvasReference(), 'mouseleave'))
          )
            .subscribe((res: MouseEvent) => {
              icon.xPosition = this._canvasMouseCoordinates.mousePosition.x - image.width/2;
              icon.yPosition = this._canvasMouseCoordinates.mousePosition.y - image.height/2;
              this.updateCanvas(heroIcons,icon,image);
          });  
        }
      });
    }
  
  addHeroIconToCanvas(image: HTMLImageElement, icon: HeroIcon) {
    console.log("ACTIVATED!");
    //this._canvasRef.getCanvasContext().drawImage(icon, xPos, yPos);
    this.updateCanvas(this._heroIconService.getHeroIconArray(), icon, image);
  }
}

// Draw Background
// Draw HeroIcon
// CanvasContext
// Draw Image Function
