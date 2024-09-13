import {NgModule} from '@angular/core';
import {ReturnOfGoodsRoutingModule} from './return-of-goods-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {ReturnOfGoodsComponent} from './return-of-goods.component';
import {FooterModule} from "../footer/footer.module";
import {HeaderModule} from "../header/header.module";
import {FeatureSliderModule} from "@app/shared/feature-slider/feature-slider.module";

@NgModule({
    imports: [
        SharedModule,
        ReturnOfGoodsRoutingModule,
        FooterModule,
        HeaderModule,
        FeatureSliderModule
    ],
  declarations: [
    ReturnOfGoodsComponent,
  ],
  exports: [
    ReturnOfGoodsComponent
  ]
})
export class ReturnOfGoodsModule {
}
