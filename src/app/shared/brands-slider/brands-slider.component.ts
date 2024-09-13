import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {BannerType} from "@app/core/models/store.model";
import {environment} from "@env/environment";
import SwiperCore, {Autoplay, Pagination, SwiperOptions} from 'swiper';
import {ModulesService} from "@app/core/services/modules.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

SwiperCore.use([
  Pagination,
  Autoplay,
]);

@Component({
  selector: 'app-brands-slider',
  templateUrl: './brands-slider.component.html',
  styleUrls: ['./brands-slider.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BrandsSliderComponent implements OnInit {

  oldBrandService: boolean = true
  brands: string[] = [];
  brandsSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 2000,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    breakpoints: {
      '300': {
        slidesPerView: 1.5,
        spaceBetween: 15,
        centeredSlides: true
      },
      '640': {
        slidesPerView: 2,
        spaceBetween: 20,
        centeredSlides: true
      },
      '768': {
        slidesPerView: 2.5,
        spaceBetween: 25
      },
      '1024': {
        slidesPerView: 3,
        spaceBetween: 30
      },
      '1280': {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  };

  constructor(
    private storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit(): void {
    if (this.dynamicMediaService.mediaBrandsLoop?.length) {
      this.oldBrandService = false
    } else {
      this.storeSettingService.getBanners(BannerType.brands).subscribe((brands: any[]) => {
        this.brands = brands.map(el => {
          return `${environment.ADMIN_API_URL}/assets/img/settings/${el.IMAGE}`;
        })
      })
    }
  }

}
