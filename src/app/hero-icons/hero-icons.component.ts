import { Component, OnInit } from '@angular/core';

import { HeroIcon } from '../hero-icon';

import { HeroIconService } from '../hero-icon.service';

@Component({
  selector: 'app-hero-icons',
  templateUrl: './hero-icons.component.html',
  styleUrls: ['./hero-icons.component.css'],
  providers: [ HeroIconService ]
})
export class HeroIconsComponent implements OnInit {
  heroIcons: HeroIcon[];

  constructor(
    private _heroIconService: HeroIconService
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
