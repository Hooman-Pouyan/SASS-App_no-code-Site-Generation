import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'beer-slider',
  templateUrl: './beer-slider.component.html',
  styleUrls: ['./beer-slider.component.scss']
})

export class BeerSliderComponent implements OnInit, OnChanges {
  afterImage: string = "";
  beforeImage: string = "";

  @Input() image: {
    BEFORE: string,
    AFTER: string
  }

  constructor() {

  }

  ngOnInit(): void {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.image) {
      const before: string = this.image.BEFORE;
      const after: string = this.image.AFTER;
      this.changePic(before, after)
    }
  }

  changePic(src_before: string, src_After: string) {
    this.beforeImage = src_before;
    this.afterImage = src_After;
  }


}

