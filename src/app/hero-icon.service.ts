import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { HeroIcon } from './hero-icon';

@Injectable({
  providedIn: 'root'
})
export class HeroIconService {

  private _heroesIconURL = 'api/heroIcons'; //URL to web api

  private heroIcons: Map<HeroIcon,HTMLImageElement> = new Map();

  constructor(
    private _http: HttpClient,
  ) { }

  // Retrieves hero icons from server
  public getHeroIcons(): Observable<HeroIcon[]> {

    return this._http.get<HeroIcon[]>(this._heroesIconURL);
  }

  // Retrieves a specific hero icon by name
  public getHeroIcon(name: string): Observable<HeroIcon> {

    const url = `${this._heroesIconURL}/?heroName=${name}`;
    return this._http.get<HeroIcon>(url);
  }

  // Retrieves hero icon array 
  public getHeroIconArray(): Map<HeroIcon,HTMLImageElement> {

    return this.heroIcons;
  }

  // Adds hero icon to array 
  public addToHeroIconArray(heroIconClass: HeroIcon, heroIconImage: HTMLImageElement) {
    
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
