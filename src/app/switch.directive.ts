import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[appSwitch]'
})
export class SwitchDirective {

  constructor() { }

  @Input('appSwitch') isMove: boolean;

}
