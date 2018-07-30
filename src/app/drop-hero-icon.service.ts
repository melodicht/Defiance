import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropHeroIconService {

  private currentDraggedHero: string;

  constructor() { }

  dragHeroIntoCanvasById(id) {
    this.currentDraggedHero = id;
  }

  getCurrentDraggedHero(): string {
    return this.currentDraggedHero;
  }
}
