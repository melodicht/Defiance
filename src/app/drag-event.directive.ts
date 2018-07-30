import { Directive, HostListener } from '@angular/core';

import { DropHeroIconService } from './drop-hero-icon.service';

@Directive({
  selector: '[appDragEvent]'
})
export class DragEventDirective {

  constructor(
    private _dropHeroIconService : DropHeroIconService
  ) { }

  @HostListener('dragstart', ['$event'])
  drag(ev) {
    this._dropHeroIconService.dragHeroIntoCanvasById(ev.target.id);
  }

}
