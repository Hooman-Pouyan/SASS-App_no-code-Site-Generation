import {Component, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'count-down',
  templateUrl: 'count-down.component.html',
  styleUrls: ['count-down.component.scss']
})

export class CountDownComponent {
  @Input() units: any;
  @Input() end: any;
  @Input() displayString: String = '';
  @Input() text: any;
  @Input() divider: any;
  @Input() showZero: Boolean = false;
  @Output() reached: EventEmitter<Date> = new EventEmitter();
  display: any = [];
  displayNumbers: any = [];
  wasReached: Boolean = false;

  constructor() {
    setInterval(() => this._displayString(), 100);
  }

  _displayString() {

    if (this.wasReached)
      return;

    if (typeof this.units === 'string') {
      this.units = this.units.split('|');
    }

    let givenDate: any = new Date(this.end);
    let now: any = new Date();
    let dateDifference: any = givenDate - now;

    if ((dateDifference < 100 && dateDifference > 0) || dateDifference < 0 && !this.wasReached) {
      this.wasReached = true;
      this.reached.next(now);
    }
    let lastUnit = this.units[this.units.length - 1],
      unitConstantForMillisecs = {
        year: (((1000 * 60 * 60 * 24 * 7) * 4) * 12),
        month: ((1000 * 60 * 60 * 24 * 7) * 4),
        weeks: (1000 * 60 * 60 * 24 * 7),
        days: (1000 * 60 * 60 * 24),
        hours: (1000 * 60 * 60),
        minutes: (1000 * 60),
        seconds: 1000
      },
      unitsLeft = {},
      returnText = '',
      returnNumbers = '',
      totalMillisecsLeft = dateDifference,
      i,
      unit: any;

    for (i in this.units) {
      if (this.units.hasOwnProperty(i)) {

        unit = this.units[i].trim();
        if (unitConstantForMillisecs[unit.toLowerCase()] === false) {
          //$interval.cancel(countDownInterval);
          throw new Error('Cannot repeat unit: ' + unit);

        }
        if (unitConstantForMillisecs.hasOwnProperty(unit.toLowerCase()) === false) {
          throw new Error('Unit: ' + unit + ' is not supported. Please use following units: year, month, weeks, days, hours, minutes, seconds, milliseconds');
        }

        // If it was reached, everything is zero
        unitsLeft[unit] = (this.wasReached) ? 0 : totalMillisecsLeft / unitConstantForMillisecs[unit.toLowerCase()];

        if (lastUnit === unit) {
          unitsLeft[unit] = Math.ceil(unitsLeft[unit]);
        } else {
          unitsLeft[unit] = Math.floor(unitsLeft[unit]);
        }

        totalMillisecsLeft -= unitsLeft[unit] * unitConstantForMillisecs[unit.toLowerCase()];
        unitConstantForMillisecs[unit.toLowerCase()] = false;

        // If it's less than 0, round to 0
        unitsLeft[unit] = (unitsLeft[unit] > 0) ? unitsLeft[unit] : 0;

        returnNumbers += ' ' + unitsLeft[unit] + ' | ';
        returnText += ' ' + unit;
      }
    }

    if (this.text === null || !this.text) {
      this.text = {
        Year: 'Year',
        Month: 'Month',
        Weeks: 'Weeks',
        Days: 'Days',
        Hours: 'Hours',
        Minutes: 'Minutes',
        Seconds: 'Seconds',
        MilliSeconds: 'Milliseconds'
      };
    }

    this.displayString = returnText
      .replace('Year', this.text.Year + ' | ')
      .replace('Month', this.text.Month + ' | ')
      .replace('Weeks', this.text.Weeks + ' | ')
      .replace('Days', this.text.Days + ' | ')
      .replace('Hours', this.text.Hours + ' | ')
      .replace('Minutes', this.text.Minutes + ' | ')
      .replace('Seconds', this.text.Seconds);

    this.displayNumbers = returnNumbers.split('|');
    this.display = this.displayString.split('|');
    if (this.displayNumbers[0] > 0 ) {
      this.displayNumbers[1]  = this.displayNumbers[0] * 24 + this.displayNumbers[1]*1
    }
  }
}
