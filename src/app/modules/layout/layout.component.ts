import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {CartService} from "@app/core/services/cart.service";
import {SidenavStatus} from "@app/core/models/cart.model";
import {AppService} from "@app/core/services/app.service";
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'mk-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public cartService: CartService,
    public appService: AppService,
    public modulesService: ModulesService
  ) {
  }

  @ViewChild('cart') cart: MatSidenav;
  @ViewChild('headerDrawer') headerDrawer: MatSidenav;
  SidenavStatus = SidenavStatus

  ngOnInit(): void {

    this.cartService.cartSidenav.subscribe(status => {
      if (status == SidenavStatus.open) {
        // this.cartService.updateLocalCart()
        // this.cartService.updateLocalNotebook()
        this.cart.open()
      } else if (status == SidenavStatus.close) {
        this.cart.close()
      }
    })

    this.appService.headerSidenav.subscribe(status => {
      if (status == SidenavStatus.open) {
        this.headerDrawer.open()
      } else if (status == SidenavStatus.close) {
        this.headerDrawer.close()
      }
    })

  }

}
