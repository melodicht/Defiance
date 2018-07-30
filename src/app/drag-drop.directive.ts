import { Directive, HostListener } from '@angular/core';

import { fromEvent, Subscription } from 'rxjs';

import { HeroIcon } from './hero-icon';

import { DrawImageService } from './draw-image.service';
import { HeroIconService } from './hero-icon.service';
import { DropHeroIconService } from './drop-hero-icon.service';
import { CanvasElementReferenceService } from './canvas-element-reference.service';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  private heroSubscription : Subscription;

  constructor(
    private _drawImageService : DrawImageService,
    private _heroIconService : HeroIconService,
    private _dropHeroIconService : DropHeroIconService,
    private _canvasRef : CanvasElementReferenceService
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
      .subscribe((res: MouseEvent) => {

        const rect = this._canvasRef.getCanvasReference().getBoundingClientRect();

        const MOUSEPOS = {
          x: res.clientX - rect.left,
          y: res.clientY - rect.top
        }

        // Fills in hero icon information for both the class data and the image
        newIcon.width = 112;
        newIcon.height = 100;
        heroIcon[0].xPosition = MOUSEPOS.x;
        heroIcon[0].yPosition = MOUSEPOS.y;
        newIcon.src = heroIcon[0].src;

        // Adds to the set of hero icons in the canvas
        this._heroIconService.addToHeroIconArray(heroIcon[0], newIcon);

        // Draws hero icon onto the canvas
        this._drawImageService.addHeroIconToCanvas(newIcon, heroIcon);

        // Stops hero from being moved 
        this.deactivate();
        
      })
  }

  // Prevents hero icon from moving once drawn on surface
  private deactivate() {
    
    // Unsubscribe from hero icon subscription
    this.heroSubscription.unsubscribe();
  }

}
