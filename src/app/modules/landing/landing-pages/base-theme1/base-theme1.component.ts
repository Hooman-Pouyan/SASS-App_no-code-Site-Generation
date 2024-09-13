import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModulesService} from 'src/app/core/services/modules.service';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {environment} from "@env/environment";
import SwiperCore, {Autoplay, Pagination, SwiperOptions} from 'swiper';
import {CategoryModel} from "@app/core/models/category.model";
import {CategoryService} from "@app/core/services/category.service";
import {LandingAttributeModel} from "@app/core/models/landing.model";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

SwiperCore.use([
  Pagination,
  Autoplay,
]);

@Component({
  selector: 'base-theme1',
  templateUrl: './base-theme1.component.html',
  styleUrls: ['./base-theme1.component.scss',],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme1Component implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
  };
  categories: CategoryModel[] = [];

  constructor(
    public modulesService: ModulesService,
    public storeSettingService: StoreSettingService,
    private categoryService: CategoryService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit() {
    this.getCategoryList();
    console.log("base1")
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories
      this.categories.forEach(category => {
        this.getProductsByCategory(category)
      })
    })
  }

  getProductsByCategory(category: CategoryModel) {
    this.categoryService.getProductsByCategoryId(category.PRODUCT_ID, 8).subscribe(products => {
      category.products = products?.DATA
    })
  }

}
