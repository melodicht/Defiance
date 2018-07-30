import { Component, OnInit } from '@angular/core';

import { HeroIconService } from '../hero-icon.service';

import { HeroIcon } from '../hero-icon';

import { DrawImageService } from '../draw-image.service';

@Component({
  selector: 'app-hero-icons',
  templateUrl: './hero-icons.component.html',
  styleUrls: ['./hero-icons.component.css'],
  providers: [ HeroIconService, DrawImageService ]
})
export class HeroIconsComponent implements OnInit {
  heroIcons: HeroIcon[];

  constructor(
    private _heroIconService: HeroIconService,
    private _drawImageService: DrawImageService
  ) { }

  ngOnInit() {
    this.getHeroIcons();
  }

  getHeroIcons(): void {
    this._heroIconService.getHeroIcons()
    .subscribe(heroIcons => {
      this.heroIcons = heroIcons;
    });
  }

}
