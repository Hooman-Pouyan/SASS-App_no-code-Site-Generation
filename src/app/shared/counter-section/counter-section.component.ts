import {Component, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {AppService} from "@app/core/services/app.service";
import {CategoryService} from "@app/core/services/category.service";
import {LandingService} from "@app/core/services/landing.service";
import {NgwWowService} from "ngx-wow";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {adjustColor} from '@app/modules/global/functions';
import {StoreService} from "@app/core/services/store.service";

@Component({
  selector: 'counter-section',
  templateUrl: './counter-section.component.html',
  styleUrls: ['./counter-section.component.scss']
})
export class CounterSectionComponent implements OnInit {

  adjustColor = (amount: number, color: string = this.modulesService.primaryColor) => adjustColor(color, amount);
  counterElement: {name: string, count: number }[] =[]

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public dragDropService: DragDropService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    private categoryService: CategoryService,
    private landingService: LandingService,
    private storeService: StoreService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit(): void {
    this.storeService.getCurrentStore().subscribe(
      (store) => {
        if (store.customer_count) {
          this.counterElement.push({
              name: 'تعداد مشتریان',
              count: store.customer_count
            }
          )
        }
      }
    );
  }

}
