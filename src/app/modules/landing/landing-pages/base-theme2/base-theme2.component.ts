import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from "@env/environment";
import SwiperCore, {Autoplay, Navigation, Pagination, SwiperOptions} from 'swiper';
import {
  ProductSliderModel,
  ProductSliderType,
} from "@app/core/models/product.model";
import {ProductService} from "@app/core/services/product.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {ModulesService} from "@app/core/services/modules.service";

SwiperCore.use([
  Pagination,
  Autoplay,
  Navigation
]);

@Component({
  selector: 'base-theme2',
  templateUrl: './base-theme2.component.html',
  styleUrls: ['./base-theme2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme2Component implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;
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
    navigation: true
  };
  products: ProductSliderModel[] = [];

  constructor(
    private productService: ProductService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService,
    public modulesService: ModulesService
  ) {
  }

  ngOnInit() {
    this.setProducts();
  }

  setProducts(): void {
    this.productService.getProductLimitedSummary(
      ProductSliderType.mostVisited, 5
    ).subscribe(products => {
      if (typeof products == 'object') {
        this.products = products;
      }
    })
  }

}
