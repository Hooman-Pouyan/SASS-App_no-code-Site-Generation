import {Component, OnInit} from '@angular/core';
import {AppService} from "@app/core/services/app.service";
import {CartService} from "@app/core/services/cart.service";
import {SidenavStatus} from "@app/core/models/cart.model";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {NavigationStart, Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'mini-contact-us',
  templateUrl: './mini-contact-us.component.html',
  styleUrls: ['./mini-contact-us.component.scss']
})
export class MiniContactUsComponent implements OnInit {

  showBtn: boolean = true

  constructor(
    private appService: AppService,
    private cartService: CartService,
    public storeSettingService: StoreSettingService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.checkShowBtn()
  }

  checkShowBtn(): void {
    this.appService.headerSidenav.subscribe(status => {
      if (status == SidenavStatus.open) {
        this.showBtn = false
      } else if (status == SidenavStatus.close) {
        this.showBtn = true
      }
    })
    this.cartService.cartSidenav.subscribe(status => {
      if (status == SidenavStatus.open) {
        this.showBtn = false
      } else if (status == SidenavStatus.close) {
        this.showBtn = true
      }
    })
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe((nav: NavigationStart) => {
      if (nav.url.includes('product')) {
        this.showBtn = false
      }
    })
  }

}
