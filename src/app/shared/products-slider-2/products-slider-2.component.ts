import {
  Component,
  Input, OnChanges,
  OnInit, SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {ProductSliderModel} from '@app/core/models/product.model';
import {SwiperComponent} from "swiper/angular";
import SwiperCore, {Autoplay, Navigation, SwiperOptions} from 'swiper';
import {ModulesService} from "@app/core/services/modules.service";
import {_window} from "@app/modules/global/global-variable";

SwiperCore.use([
  Autoplay,
  Navigation,
]);

@Component({
  selector: 'products-slider-2',
  templateUrl: './products-slider-2.component.html',
  styleUrls: ['./products-slider-2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductsSlider2Component implements OnInit, OnChanges {

  @ViewChild("swiper") swiper: SwiperComponent;
  @Input() products: ProductSliderModel[];
  @Input() title: string;
  @Input() link: string;
  @Input() queryParams: {[key: string]: string};
  @Input() perSlide: number;
  @Input() theme: 'light' | 'dark' = "light";
  windowWidth: number = _window.innerWidth;

  productSliderConfig: SwiperOptions = {
    navigation: true,
    loop: false,
    autoplay: {
      delay: 1500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    breakpoints: {
      '300': {
        slidesPerView: 2.5,
        spaceBetween: 15,
        centeredSlides: true
      },
      '640': {
        slidesPerView: 3,
        spaceBetween: 20,
        centeredSlides: true
      },
      '768': {
        slidesPerView: 3,
        spaceBetween: 25
      },
      '1024': {
        slidesPerView: 3.5,
        spaceBetween: 30
      },
      '1280': {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  };

  constructor(
    public modulesService: ModulesService
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.perSlide) {
      this.productSliderConfig.breakpoints['1281'].slidesPerView = this.perSlide
      this.swiper?.updateSwiper(this.productSliderConfig)
    }
    if (this.products?.length) {
      this.setResponsive()
    }
  }

  setResponsive() {
    if (_window.innerWidth <= 959) {
      this.productSliderConfig.navigation = false;
    }
    for (let width of Object.keys(this.productSliderConfig.breakpoints)) {
      if (this.productSliderConfig.breakpoints[width].slidesPerView >= this.products.length) {
        this.productSliderConfig.breakpoints[width].slidesPerView = this.products.length
        this.productSliderConfig.navigation = false
      }
    }
  }

}
