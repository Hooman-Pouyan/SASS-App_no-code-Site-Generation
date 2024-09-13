import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rate',
  templateUrl: './rate-star.component.html',
  styleUrls: ['./rate-star.component.scss']
})
export class RateStarComponent implements OnInit {
  @Input() inputRate: number = 1;
  @Input() disabled: boolean = false;
  @Output() rate: EventEmitter<number> = new EventEmitter<number>()

  rateList = [1, 2, 3, 4, 5]

  constructor() { }

  ngOnInit(): void {
  }
}
