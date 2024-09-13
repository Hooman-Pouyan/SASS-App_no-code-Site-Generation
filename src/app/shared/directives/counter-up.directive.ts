import {Directive, ElementRef, HostListener, Input} from '@angular/core';
import {isInViewPort} from "@app/modules/global/functions";
import Timeout = NodeJS.Timeout;

@Directive({
  selector: '[counterUp]'
})
export class CounterUpDirective {

  @Input() maxCounter: number = 15;
  started: boolean = false;

  constructor(
    private _el: ElementRef
  ) {
  }

  @HostListener('window:scroll')
  checkCounter(): void {
    const el: Element = this._el.nativeElement

    if (this.started == false && isInViewPort(el)) {
      this.started = true
      el.innerHTML = '0'
      const counterFunc: Timeout = setInterval(() => {
        if (+el.innerHTML < this.maxCounter) {
          let num: number = +el.innerHTML
          num += Math.pow(10, this.maxCounter.toString().length - 2);
          el.innerHTML = num.toString()
        } else {
          el.innerHTML = this.maxCounter.toString()
          clearInterval(counterFunc)
        }
      }, 100)
    }

  }

}
