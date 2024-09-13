import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from '@env/environment';
import {CategoryModel} from '@app/core/models/category.model';
import {ProductsFilter, ProductSliderModel, ProductSliderType} from '@app/core/models/product.model';
import {CategoryService} from '@app/core/services/category.service';
import {ProductService} from '@app/core/services/product.service';
import {StoreSettingService} from '@app/core/services/store-setting.service';
import SwiperCore, {Autoplay, Pagination, SwiperOptions} from 'swiper';
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {ModulesService} from "@app/core/services/modules.service";

SwiperCore.use([
  Pagination,
  Autoplay,
]);

@Component({
  selector: 'base-theme4',
  templateUrl: './base-theme4.component.html',
  styleUrls: ['./base-theme4.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme4Component implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL
  categories: CategoryModel[] = [];
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
  };
  productsSlider: {
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
    link?: string,
    query?: {[key: string]: string}
  } = {
    name: 'جدیدترین محصولات',
    type: ProductSliderType.latest,
    products: [],
    link: `/store/category/1`
  };
  productsSummary: {
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
    link?: string,
    query?: {[key: string]: string}
  } = {
    name: 'پرفروش ترین ها',
    type: ProductSliderType.bestSellers,
    products: [],
    link: `/store/category/1`,
    query: {'sort': ProductsFilter.mostSell.toString()}
  };

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    private categoryService: CategoryService,
    private productService: ProductService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit() {
    this.getProductsSlider(this.productsSlider);
    this.getProductsSlider(this.productsSummary);
    this.getCategoryList();
  }

  getProductsSlider(sliderType: {
    type: ProductSliderType,
    products?: ProductSliderModel[]
  }): void {
    this.productService.getProductLimitedSummary(sliderType.type, 6).subscribe(products => {
      sliderType.products = products
    })
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories
    })
  }

}
