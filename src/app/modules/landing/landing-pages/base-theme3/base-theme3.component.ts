import {
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {ModulesService} from 'src/app/core/services/modules.service';
import {environment} from "@env/environment";
import {ProductService} from "@app/core/services/product.service";
import {
  ProductSliderModel,
  ProductSliderType,
} from "@app/core/models/product.model";
import {CategoryService} from "@app/core/services/category.service";
import {CategoryModel} from "@app/core/models/category.model";
import SwiperCore, {Autoplay, Pagination, SwiperOptions} from 'swiper';
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {AppService} from "@app/core/services/app.service";

SwiperCore.use([
  Pagination,
  Autoplay,
]);

@Component({
  selector: 'base-theme3',
  templateUrl: './base-theme3.component.html',
  styleUrls: ['./base-theme3.component.scss',],
  encapsulation: ViewEncapsulation.None,
})
export class BaseTheme3Component implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;
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
  categories: CategoryModel[] = [];
  categoryProducts: ProductSliderModel[] = [];

  constructor(
    public modulesService: ModulesService,
    private productService: ProductService,
    private categoryService: CategoryService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService,
    public appService: AppService
  ) {
  }

  ngOnInit() {
    this.getCategoryList();
    this.getCategoryProducts();
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories
    })
  }

  getCategoryProducts(): void {
    this.productService.getProductLimitedSummary(ProductSliderType.mostVisited, 6).subscribe(products => {
      if (typeof products == 'object') {
        this.categoryProducts = products
      }
    })
  }

}
