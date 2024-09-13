import {Component, HostListener, OnInit} from '@angular/core';
import {_window} from "@app/modules/global/global-variable";
import {AppService} from "@app/core/services/app.service";

@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss']
})
export class ScrollToTopComponent implements OnInit {

  bottomPosition: '-3px' | '-100px' = '-100px'

  constructor(
    public appService: AppService
  ) { }

  ngOnInit(): void {
    this.onScroll()
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.appService.muchScrolled > 1000) {
      this.bottomPosition = '-3px';
    }
    else {
      this.bottomPosition = '-100px';
    }
  }

}
