import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {BannerType} from "@app/core/models/store.model";
import {ModulesService} from '@app/core/services/modules.service';
import {FactorService} from "@app/core/services/factor.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {DragDropService} from "@app/core/services/drag-drop.service";

@Component({
  selector: 'mk-aboutUs',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  aboutUsImage: string = '../../../../assets/img/help/about-us.png';

  productFeatures: {
    img: string,
    desc: string,
    enable: boolean
  }[] = [
    {
      img: 'free_delivery.png',
      desc: 'امکان ارسال رایگان',
      enable: this.factorService.currentOrder.freeCourier
    },
    {
      img: 'guarantee.png',
      desc: 'ضمانت کالا',
      enable: this.modulesService.originalProduct
    },
    {
      img: 'payment_method.png',
      desc: 'امکان پرداخت در محل',
      enable: this.modulesService.payOnSpot
    },
    {
      img: 'return_guarantee.png',
      desc: 'گارانتی بازگشت کالا',
      enable: this.modulesService.returnGuarantee
    },
    {
      img: 'fullTime_support.png',
      desc: 'پشتیبانی 24/7',
      enable: this.modulesService.fullTimeSupport
    },
    {
      img: 'express_delivery.png',
      desc: 'تحویل فوری',
      enable: this.modulesService.expressReceive
    },
  ];

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    private factorService: FactorService,
    public dynamicMediaService: DynamicMediaService,
    public dragDropService: DragDropService
  ) {
  }

  ngOnInit() {
    if (!this.dynamicMediaService.getMedia('about-us')) {
      this.getAboutUsImage();
    }
  }

  getAboutUsImage() {
    this.storeSettingService.getBanners(BannerType.aboutUs).subscribe(res => {
      if (res) {
        const [response] = res;
        if (response?.IMAGE)
          this.aboutUsImage = `${environment.ADMIN_API_URL}/assets/img/settings/${response?.IMAGE}`;
      }
    })
  }

}
