import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropHeroIconService {

  private currentDraggedHero: string;

  constructor() { }

  // Identifies currently dragged hero icon
  dragHeroIntoCanvasById(id) {
    this.currentDraggedHero = id;
  }

  // Returns currently dragged hero icon for drag-drop.directive
  getCurrentDraggedHero(): string {
    return this.currentDraggedHero;
  }
}
