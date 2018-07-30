import { Directive, HostListener } from '@angular/core';

import { fromEvent, Subject, Subscription } from 'rxjs';

import { HeroIcon } from './hero-icon';

import { DrawImageService } from './draw-image.service';
import { HeroIconService } from './hero-icon.service';
import { DropHeroIconService } from './drop-hero-icon.service';
import { Observable } from '../../node_modules/rxjs';
import { CanvasElementReferenceService } from './canvas-element-reference.service';
import { takeWhile } from '../../node_modules/rxjs/operators';

@Directive({
  selector: '[appDragDrop]'
})
export class DragDropDirective {

  private hero : HeroIcon;
  private heroIcons :  Map<HeroIcon,HTMLImageElement> = new Map();

  private heroTrue : Subscription;

  constructor(
    private _drawImageService : DrawImageService,
    private _heroIconService : HeroIconService,
    private _dropHeroIconService : DropHeroIconService,
    private _canvasRef : CanvasElementReferenceService
  ) {}

  @HostListener('dragover', ['$event'])
  allowDrop(ev) {
    ev.preventDefault();
  }

  @HostListener('drop', ['$event']) 
  drop(ev) {
    ev.preventDefault();
    let currentHero = this._dropHeroIconService.getCurrentDraggedHero();
    this._heroIconService.getHeroIcon(currentHero)
      .subscribe(hero => {
        console.log(hero);
        this.setHeroIcon(hero);
      });
  }

  setHeroIcon(heroIcon: HeroIcon){

    let newIcon = new Image();
    
    this.heroTrue = fromEvent(this._canvasRef.getCanvasReference(), 'mousemove')
      .subscribe((res: MouseEvent) => {

        const rect = this._canvasRef.getCanvasReference().getBoundingClientRect();

        const MOUSEPOS = {
          x: res.clientX - rect.left,
          y: res.clientY - rect.top
        }

        newIcon.width = 112;
        newIcon.height = 100;
        heroIcon[0].xPosition = MOUSEPOS.x;
        heroIcon[0].yPosition = MOUSEPOS.y;
        newIcon.src = heroIcon[0].src;

        this._heroIconService.addToHeroIconArray(heroIcon[0], newIcon);

        this._drawImageService.addHeroIconToCanvas(newIcon, heroIcon);
        this.deactivate();
        
      })
  }

  private deactivate() {
    console.log("DEACTIVATED!");
    this.heroTrue.unsubscribe();
  }

}
