import { Component, OnInit } from '@angular/core';

import { fromEvent } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';

import { SwitchService } from '../switch.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
  providers: [
    SwitchService
  ]
})
export class SwitchComponent implements OnInit {

  public isMove: boolean = false;

  constructor(private _switchService: SwitchService) { }

  ngOnInit() {
    this.initiateSwitch();
  }

  private initiateSwitch() {
    this._switchService.setSwitchMode(this.isMove);

  }

}
