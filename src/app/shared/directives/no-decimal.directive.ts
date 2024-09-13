import {Directive, EventEmitter, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[noDecimal]',
})
export class NoDecimalDirective {

  @Input() numValue: number;
  @Output() newValue:EventEmitter<number> = new EventEmitter()

  constructor() { }

  @HostListener('keyup', ['$event'])
  keyUp() {
    this.newValue.emit(Math.round(this.numValue))
  }

}
