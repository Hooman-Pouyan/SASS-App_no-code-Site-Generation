import {Component, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {SocialType} from "@app/core/models/store.model";
import {AppService} from "@app/core/services/app.service";
import {SidenavStatus} from "@app/core/models/cart.model";
import {CartService} from "@app/core/services/cart.service";

@Component({
  selector: 'whatsapp-contact',
  templateUrl: './whatsapp-contact.component.html',
  styleUrls: ['./whatsapp-contact.component.scss']
})
export class WhatsappContactComponent implements OnInit {

  showBtn: boolean = true

  constructor(
    private storeSettingService: StoreSettingService,
    private appService: AppService,
    private cartService: CartService
  ) {
  }

  ngOnInit(): void {
    this.checkShowBtn()
  }

  get phoneNumber(): string {
    const whatsappLink: string = this.storeSettingService.store?.socials?.find(f => f.type == SocialType.whatsapp)?.link
    return whatsappLink?.split('=')[1]
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
  }

}
