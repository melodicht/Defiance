import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { fromEvent, Subject } from 'rxjs';

import { HeroIcon } from './hero-icon';
import { MapType } from '../../node_modules/@angular/compiler/src/output/output_ast';

import { CanvasMouseCoordinatesService } from './canvas-mouse-coordinates.service';
import { CanvasElementReferenceService } from './canvas-element-reference.service'

@Injectable({
  providedIn: 'root'
})
export class HeroIconService {

  private _heroesIconURL = 'api/heroIcons'; //URL to web api

  private heroIcons: Map<HeroIcon,HTMLImageElement> = new Map();
  private heroIcon: HeroIcon;
  private heroIconName: string;

  constructor(
    private _http: HttpClient,
    private _canvasMouseCoordinatesService: CanvasMouseCoordinatesService,
    private _canvasRef: CanvasElementReferenceService
  ) { }

  getHeroIcons() {
    return this._http.get<HeroIcon[]>(this._heroesIconURL);
  }

  getHeroIcon(name: string): Observable<HeroIcon> {
    const url = `${this._heroesIconURL}/?heroName=${name}`;
    return this._http.get<HeroIcon>(url);
  }

  getHeroIconArray(): Map<HeroIcon,HTMLImageElement> {
    return this.heroIcons;
  }

  addToHeroIconArray(heroIconClass: HeroIcon, heroIconImage: HTMLImageElement) {
    this.heroIcons.set(heroIconClass, heroIconImage);
  }

// NEED TO REPAIR
  initiateHeroIcon(iconImage, iconClass, width, height, xPos, yPos, src) {
    iconImage.width = width;
    iconImage.height = height;
    iconClass.xPosition = xPos;
    iconClass.yPosition = yPos;
    iconImage.src = src;
  }

}
