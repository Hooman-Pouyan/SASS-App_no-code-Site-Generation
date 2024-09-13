import { Component, OnInit } from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {AppService} from "@app/core/services/app.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {SidenavStatus} from "@app/core/models/cart.model";
import {LandingAttributeModel} from "@app/core/models/landing.model";

@Component({
  selector: 'base-theme17',
  templateUrl: './base-theme17.component.html',
  styleUrls: ['./base-theme17.component.scss']
})
export class BaseTheme17Component implements OnInit {

  banners: LandingAttributeModel[] = [];
  sidenavStatus = SidenavStatus;
  cartCount: number = 0;

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    public dragDropService: DragDropService,
  ) { }

  ngOnInit(): void {
    this.onCallCartNotebook();
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

}
