import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {BannerType} from "@app/core/models/store.model";
import {ModulesService} from "@app/core/services/modules.service";
import {FactorService} from "@app/core/services/factor.service";

@Component({
  selector: 'mk-return-of-goods',
  templateUrl: './return-of-goods.component.html',
  styleUrls: ['./return-of-goods.component.scss']
})
export class ReturnOfGoodsComponent implements OnInit {

  returnOfGoodsImage: string = '../../../../assets/img/help/return-of-goods.png';

  productFeatures: {
    img: string,
    desc: string,
    enable: boolean
  }[] = [
    {
      img:'free_delivery.png',
      desc: 'امکان ارسال رایگان',
      enable: this.factorService.currentOrder.freeCourier
    },
    {
      img:'guarantee.png',
      desc: 'ضمانت کالا',
      enable: this.modulesService.originalProduct
    },
    {
      img:'payment_method.png',
      desc: 'امکان پرداخت در محل',
      enable: this.modulesService.payOnSpot
    },
    {
      img:'return_guarantee.png',
      desc: 'گارانتی بازگشت کالا',
      enable: this.modulesService.returnGuarantee
    },
    {
      img:'fullTime_support.png',
      desc: 'پشتیبانی 24/7',
      enable: this.modulesService.fullTimeSupport
    },
    {
      img:'express_delivery.png',
      desc: 'تحویل فوری',
      enable: this.modulesService.expressReceive
    },
  ];

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    private factorService: FactorService
  ) {
  }

  ngOnInit() {
    this.getReturnOfGoodsImage();
  }

  getReturnOfGoodsImage() {
    this.storeSettingService.getBanners(BannerType.returnOfGoods).subscribe(res => {
      if (res) {
        const [response] = res;
        this.returnOfGoodsImage = `${environment.ADMIN_API_URL}/assets/img/settings/${response?.IMAGE}`;
      }
    })
  }
}
