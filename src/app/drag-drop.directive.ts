import { Directive, HostListener } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';
import { map } from "rxjs/operators";

import { HeroIcon } from './hero-icon';
import { MousePosition } from './mouse-position';

import { DrawImageService } from './draw-image.service';
import { HeroIconService } from './hero-icon.service';
import { DropHeroIconService } from './drop-hero-icon.service';
import { CanvasElementReferenceService } from './canvas-element-reference.service';
import { CanvasMouseCoordinatesService } from './canvas-mouse-coordinates.service';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  private heroSubscription : Subscription;

  private mousePosition : MousePosition;

  constructor(
    private _drawImageService : DrawImageService,
    private _heroIconService : HeroIconService,
    private _dropHeroIconService : DropHeroIconService,
    private _canvasRef : CanvasElementReferenceService,
    private _canvasMouseCoordinatesService : CanvasMouseCoordinatesService
  ) {}

  // Prevents default when icon is over canvas
  @HostListener('dragover', ['$event'])
  allowDrop(ev: Event) {

    ev.preventDefault();
  }

  // Allows for icon to be registered by canvas
  @HostListener('drop', ['$event']) 
  drop(ev: Event) {

    ev.preventDefault();

    // Retrieves current dragged hero from drop-hero-icon.service
    let currentHero = this._dropHeroIconService.getCurrentDraggedHero();

    // Retrieves data about the hero icon from data base 
    this._heroIconService.getHeroIcon(currentHero)
      .subscribe(hero => {

        console.log(hero);

        // Inserts hero icon into canvas on mouse position
        this.setHeroIcon(hero);
      });
  }

  private setHeroIcon(heroIcon: HeroIcon){

    let newIcon = new Image();

    this.heroSubscription = fromEvent(this._canvasRef.getCanvasReference(), 'mousemove')
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
    .subscribe((mousePos: MousePosition) => {
      // Fills in hero icon information for both the class data and the image
      newIcon.width = 112;
      newIcon.height = 100;
      heroIcon[0].xPosition = mousePos.x;
      heroIcon[0].yPosition = mousePos.y;
      newIcon.src = heroIcon[0].src;
      newIcon.className = "image-cropper";

      console.log(newIcon);

      // Adds to the set of hero icons in the canvas
      this._heroIconService.addToHeroIconArray(heroIcon[0], newIcon);

      // Draws hero icon onto the canvas
      this._drawImageService.addHeroIconToCanvas(newIcon, heroIcon[0]);  

      // Prevents the icon from following the cursor after drop
      this.deactive();
    });

  }

  // Unsubscribes from heroSubscription 
  private deactive() {
    this.heroSubscription.unsubscribe();
  }
  
  // NEED TO FIX, CURRENTLY, MOUSEPOS WILL BECOME INNACCURATE WHEN IMAGE IS BEING DRAGGED
  private getMouseCoordinates() {
    this._canvasMouseCoordinatesService.getMouseCoordinates()
    .subscribe((mousePos: MousePosition) => {
      this.mousePosition = mousePos;
      console.log(mousePos);
    });
  }

}
