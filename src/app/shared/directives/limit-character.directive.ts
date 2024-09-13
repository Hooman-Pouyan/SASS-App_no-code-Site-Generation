import {AfterViewInit, Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[limitCharacter]'
})
export class LimitCharacterDirective implements AfterViewInit{

  @Input() limit: number = 50;

  constructor(
    private _el: ElementRef
  ) { }

  ngAfterViewInit() {
    if (this._el.nativeElement.innerText.length > (this.limit + 5)) {
      this._el.nativeElement.innerText = this._el.nativeElement.innerText.slice(0, this.limit)
      this._el.nativeElement.innerText += '...';
    }
  }

}
