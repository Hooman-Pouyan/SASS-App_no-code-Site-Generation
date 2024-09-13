import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import SwiperCore, {Autoplay, Navigation, Pagination, SwiperOptions} from 'swiper';
import {ModulesService} from '@app/core/services/modules.service';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {FactorService} from "@app/core/services/factor.service";
import {ProductsFilter, ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";
import {ProductService} from "@app/core/services/product.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {SwiperComponent} from "swiper/angular";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import { SidenavStatus } from '@app/core/models/cart.model';
import { CartService } from '@app/core/services/cart.service';

SwiperCore.use([
  Pagination,
  Navigation,
  Autoplay,
]);

@Component({
  selector: 'base-theme7',
  templateUrl: './base-theme7.component.html',
  styleUrls: ['./base-theme7.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme7Component implements OnInit {

  @ViewChild('swiper', {static: false}) swiper?: SwiperComponent;
  searchIcon: boolean = false;
  sidenavStatus = SidenavStatus;
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
    navigation: true
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
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public modulesService: ModulesService,
    private factorService: FactorService,
    private productService: ProductService,
    public dynamicMediaService: DynamicMediaService,
    public cartService: CartService,
    public dragDropService: DragDropService
  ) {
  }

  ngOnInit(): void {
    this.getProductsSlider(this.productsSummary);
    this.onCallCartNotebook();

  }

  slideNext() {
    this.swiper.swiperRef.slideNext(100);
  }

  slidePrev() {
    this.swiper.swiperRef.slidePrev(100);
  }



  getProductsSlider(sliderType: {
    type: ProductSliderType,
    products?: ProductSliderModel[]
  }): void {
    this.productService.getProductLimitedSummary(sliderType.type, 6).subscribe(products => {
      sliderType.products = products
    })
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

}
