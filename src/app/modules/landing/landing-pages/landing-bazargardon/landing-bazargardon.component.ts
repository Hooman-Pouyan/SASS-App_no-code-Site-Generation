import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModulesService} from 'src/app/core/services/modules.service';
import {LandingService} from "@app/core/services/landing.service";
import {SidenavStatus} from "@app/core/models/cart.model";
import SwiperCore, {Autoplay, Pagination, SwiperOptions} from "swiper";
import {ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {ProductService} from "@app/core/services/product.service";
import {CategoryService} from "@app/core/services/category.service";
import {CategoryModel} from "@app/core/models/category.model";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

SwiperCore.use([
  Pagination,
  Autoplay,
]);

@Component({
  selector: 'landing-bazargardon',
  templateUrl: './landing-bazargardon.component.html',
  styleUrls: ['./landing-bazargardon.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingBazargardonComponent implements OnInit {

  cartSidenavStatus = SidenavStatus;
  cartCount: number = 0;
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
  };
  products: ProductSliderModel[] = [];
  categories: CategoryModel[] = [];

  constructor(
    private landingService: LandingService,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public modulesService: ModulesService,
    private productService: ProductService,
    private categoryService: CategoryService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit() {
    this.setProducts();
    this.getSecondLevelCategories();
  }

  setProducts(): void {
    this.productService.getProductLimitedSummary(ProductSliderType.bestSellers, 3).subscribe(products => {
      if (typeof products == 'object') {
        this.products = products;
      }
    })
  }

  getSecondLevelCategories(): void {
    this.categoryService.getSubCategories(1).subscribe((parentCategory: CategoryModel[]) => {
      parentCategory.forEach(each => {
        this.categoryService.getSubCategories(each.PRODUCT_ID).subscribe(subCategories => {
          subCategories.forEach(subCategory => {
            this.categories.push({
              NAME: subCategory.product.NAME,
              PRODUCT_ID: subCategory.product.ID,
            })
          })
        })
      })
    })
  }

}
