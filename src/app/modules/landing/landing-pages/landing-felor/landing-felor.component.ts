import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {LandingAttributeModel, LandingCategoriesModel} from '@app/core/models/landing.model';
import {CategoryService} from '@app/core/services/category.service';
import {CredentialsService} from '@app/core/services/credentials.service';
import {LandingService} from '@app/core/services/landing.service';
import {ModulesService} from '@app/core/services/modules.service';
import {StoreSettingService} from '@app/core/services/store-setting.service';
import {RequestRareProductsComponent} from '@app/shared/request-rare-products/request-rare-products.component';
import {environment} from '@env/environment';
import {NotificationService} from "@app/core/services/notification.service";
import SwiperCore, {Pagination, SwiperOptions} from "swiper";
import {Autoplay} from "swiper/core";
import {DragDropService} from "@app/core/services/drag-drop.service";

SwiperCore.use([
  Pagination,
  Autoplay,
]);

@Component({
  selector: 'landing-felor',
  templateUrl: './landing-felor.component.html',
  styleUrls: ['./landing-felor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingFelorComponent implements OnInit {

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
  };
  mainSlider: LandingAttributeModel[] = [];
  videoSrc: string = '';
  downerDecoratives: LandingAttributeModel = {}
  sections: LandingCategoriesModel[] = []


  constructor(
    public modulesService: ModulesService,
    private landingService: LandingService,
    public credentialsService: CredentialsService,
    public storeSettingService: StoreSettingService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    public dragDropService: DragDropService
  ) {
  }


  ngOnInit() {
    this.setLandingValue();
    this.getSection();
  }

  setLandingValue(): void {
    this.landingService.getLandingValue().subscribe(landing => {

      const _videoSrc: string = landing.find(f => f.VALUE_TYPE.includes('video')).VALUE
      if (_videoSrc && _videoSrc != 'undefined') {
        this.videoSrc = environment.ADMIN_API_URL + _videoSrc
      }

      let idx: number = 1
      for (let i = 0; i < landing.length; i++) {
        if (landing[i].VALUE_TYPE.includes('slider') &&
          !landing[i].VALUE_TYPE.includes('sliderLink') &&
          landing[i].VALUE != 'undefined') {
          this.mainSlider.push({
            link: landing.find(f => f.VALUE_TYPE == `sliderLink${idx}`)?.VALUE,
            image: environment.ADMIN_API_URL + landing[i].VALUE,
          })
          idx++
        }
      }

      this.downerDecoratives = {
        text: landing.find(f => f.VALUE_TYPE == "desc2")?.VALUE,
      }

    })
  }

  getSection() {
    this.categoryService.getSection().subscribe(data => {
      this.sections = data.map(el => {
        el.IMAGE = environment.ADMIN_API_URL + '/assets/img/landing/' + el.IMAGE
        return el
      })
    })
  }

  openRareProduct(): void {
    this.dialog.open(RequestRareProductsComponent, {
      width: '700px',
      maxWidth: '95%',
      maxHeight: '100%'
    }).afterClosed().subscribe(res => {
      if (res) {
        this.notificationService.valid('در 48 ساعت کاری آینده همکاران ما برای سفارش این محصول با شما تماس می گیرند')
      }
    })
  }

  setCategoriesWidthStyle(length: number, index: number): string {
    if (length % 4 == 0) {
      return '25%'
    } else if (length % 3 == 0) {
      return '33.33%'
    } else if (length == 2) {
      return '50%'
    } else if (length == 1) {
      return '100%'
    } else if (length % 4 == 1 && index <= 3) {
      return '25%'
    } else if (length % 4 == 1 && index + 1 == length) {
      return '100%'
    } else if (length % 4 == 1 && index > 2) {
      return '50%'
    } else if (length % 4 == 3 && index > 3) {
      return '33.33%'
    } else if (length % 4 == 3 && index <= 3) {
      return '25%'
    } else if (length % 4 == 2 && index <= 7) {
      return '25%'
    } else if (length % 4 == 2 && index > 7) {
      return '50%'
    } else {
      return '25%'
    }
  }

}
