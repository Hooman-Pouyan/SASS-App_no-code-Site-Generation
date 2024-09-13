import {Component, OnInit} from '@angular/core';
import {StoreSettingService} from '@app/core/services/store-setting.service';
import {environment} from '@env/environment';
import {CategoryService} from "@app/core/services/category.service";
import {CategoryModel} from "@app/core/models/category.model";
import {ProductsFilter, ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";
import {ProductService} from "@app/core/services/product.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {AppService} from "@app/core/services/app.service";

@Component({
  selector: 'base-theme6',
  templateUrl: './base-theme6.component.html',
  styleUrls: ['./base-theme6.component.scss']
})
export class BaseTheme6Component implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL
  categories: CategoryModel[] = [];

  productsSlider: {
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
    link?: string,
    query?: { [key: string]: string }
  } = {
    name: 'جدیدترین محصولات',
    type: ProductSliderType.latest,
    link: `/store/category/1`
  };
  productsSummary: {
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
    link?: string,
    query?: { [key: string]: string }
  } = {
    name: 'پرفروش ترین ها',
    type: ProductSliderType.bestSellers,
    link: `/store/category/1`,
    query: {'sort': ProductsFilter.mostSell.toString()}
  };

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService,
    public storeSettingService: StoreSettingService,
    public dynamicMediaService: DynamicMediaService,
    public dragDropService: DragDropService,
    public appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getProductsSlider(this.productsSlider);
    this.getProductsSummary(this.productsSummary);
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories
    })
  }

  getProductsSlider(sliderType: {
    type: ProductSliderType,
    products?: ProductSliderModel[]
  }): void {
    this.productService.getProductLimitedSummary(sliderType.type, 15).subscribe(products => {
      sliderType.products = products
    })
  }

  getProductsSummary(sliderType: {
    type: ProductSliderType,
    products?: ProductSliderModel[]
  }): void {
    this.productService.getProductLimitedSummary(sliderType.type, 10).subscribe(products => {
      sliderType.products = products
    })
  }

}
