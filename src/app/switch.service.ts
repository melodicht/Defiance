import { Injectable, ValueProvider } from '@angular/core';

import { Observable } from '../../node_modules/rxjs';
import { startWith, scan } from 'rxjs/operators';
import { of } from 'rxjs';
import { fromEvent } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SwitchService {

  constructor() { }

  setSwitchMode(isMove: boolean): void {
    

  }

  getSwitchMode() {
    const toggleButton = document.querySelector('#togBtn');  
    const buttonInitialState = false;
    const clicks = fromEvent(toggleButton, 'click');
    const toggleState = currentState => !currentState;
    
    const toggle = clicks.pipe(
      scan(toggleState, buttonInitialState),
      startWith(buttonInitialState)
    )

    return toggle;
  }

}
