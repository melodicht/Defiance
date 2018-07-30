import { Directive, HostListener } from '@angular/core';

import { DropHeroIconService } from './drop-hero-icon.service';
import { DrawImageService } from './draw-image.service';

@Directive({
  selector: '[appDragEvent]'
})
export class DragEventDirective {

  constructor(
    private _dropHeroIconService : DropHeroIconService,
    private _drawImageSerivce : DrawImageService
  ) { }

  @HostListener('dragstart', ['$event'])
  drag(ev) {
    this._dropHeroIconService.dragHeroIntoCanvasById(ev.target.id);
  }

}
