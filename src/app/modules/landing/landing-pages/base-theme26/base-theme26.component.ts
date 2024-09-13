import {Component, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {AppService} from "@app/core/services/app.service";
import {CategoryService} from "@app/core/services/category.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {ProductService} from "@app/core/services/product.service";
import {FormBuilder} from "@angular/forms";
import {TicketService} from "@app/core/services/ticket.service";
import {NotificationService} from "@app/core/services/notification.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import { adjustColor } from '@app/modules/global/functions';
import {CategoryModel} from "@app/core/models/category.model";
import {environment} from "@env/environment";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";
import {LandingService} from "@app/core/services/landing.service";
import {ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";

@Component({
  selector: 'base-theme26',
  templateUrl: './base-theme26.component.html',
  styleUrls: ['./base-theme26.component.scss']
})
export class BaseTheme26Component implements OnInit {

  adjustColor = (amount: number, color: string = this.modulesService.primaryColor) => adjustColor(color, amount);
  imageUrl: string = environment.ADMIN_API_URL;
  categories: CategoryModel[] = [];
  features: GeneralAttributeModel[]  =[]
  products: ProductSliderModel[] = [];

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    private categoryService: CategoryService,
    public dragDropService: DragDropService,
    private productService: ProductService,
    private landingService: LandingService,
    public dynamicMediaService: DynamicMediaService,) {
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getFeatures();
    this.getMostSaleProducts();
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories;
      this.categories.forEach(category => this.getProductsByCategory(category))
    })
  }

  getProductsByCategory(category: CategoryModel) {
    this.categoryService.getProductsByCategoryId(category.PRODUCT_ID, 8).subscribe(products => {
      category.products = products?.DATA
    })
  }

  // setProducts(): void {
  //   this.productService.getProductLimitedSummaryforGroups(ProductSliderType.groupsOffers, 5, this.credentialsService.credentials?.USER_ROLE_ID).subscribe(products => {
  //     if (typeof products == 'object') {
  //       this.products = products;
  //     }
  //   })
  // }

  getMostSaleProducts(): void {
    this.productService.getProductLimitedSummary(ProductSliderType.mostVisited, 8).subscribe(products => {
      if (typeof products == 'object') {
        this.products = products;
      }
    })
  }

  getFeatures(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.attribute).subscribe(res => {
      this.features = res.map(el => {
        el.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + el.FILES
        return el
      })
    })
  }

}
