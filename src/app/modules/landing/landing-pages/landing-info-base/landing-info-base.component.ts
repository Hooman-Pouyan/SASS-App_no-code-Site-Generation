import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, {Autoplay, Navigation, SwiperOptions} from "swiper";
import {LandingService} from "@app/core/services/landing.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {environment} from "@env/environment";
import {LandingAttributeModel} from "@app/core/models/landing.model";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";

SwiperCore.use([
  Autoplay,
  Navigation,
]);

@Component({
  selector: 'landing-info-base',
  templateUrl: './landing-info-base.component.html',
  styleUrls: ['./landing-info-base.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingInfoBaseComponent implements OnInit {

  mainSlider: LandingAttributeModel[] = []
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
    navigation: true,
  };
  aboutUsImage: string = '../../../../assets/img/help/about-us.png';
  blogs: GeneralAttributeModel[] = []

  constructor(
    private landingService: LandingService,
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService
  ) { }

  ngOnInit(): void {
    this.setLandingValue();
    this.getBlogs();
  }

  setLandingValue(): void {
    this.landingService.getLandingValue().subscribe(landing => {

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

    })
  }

  getBlogs(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.blog).subscribe(res => {
      this.blogs = res.map(m => {
        m.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + m.FILES
        return m
      })
    })
  }

}
