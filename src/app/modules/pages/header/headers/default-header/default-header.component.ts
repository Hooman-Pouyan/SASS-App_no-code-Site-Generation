import {Component, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CartService} from "@app/core/services/cart.service";
import {SidenavStatus} from "@app/core/models/cart.model";
import {AppService} from "@app/core/services/app.service";
import {_window} from "@app/modules/global/global-variable";
import {CategoryModel} from "@app/core/models/category.model";
import {CategoryService} from "@app/core/services/category.service";
import {DragDropService} from "@app/core/services/drag-drop.service";

@Component({
  selector: 'default-header',
  templateUrl: './default-header.component.html',
  styleUrls: [
    './default-header.component.scss',
  ],
})

export class DefaultHeaderComponent implements OnInit {

  categories: CategoryModel[] = [];
  sidenavStatus = SidenavStatus;
  cartCount: number = 0;

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    private categoryService: CategoryService,
    public dragDropService: DragDropService
  ) {
  }

  ngOnInit() {
    this.onCallCartNotebook();
    this.getMainCategories();
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

  getMainCategories(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      if (categories) {
        this.categories = categories;
      }
    });
  }
}
