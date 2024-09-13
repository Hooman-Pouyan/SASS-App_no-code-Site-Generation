import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingRoutingModule} from './landing-routing.module';
import {SharedModule} from "@app/shared/shared.module";
import {LuckWheelModule} from '@app/shared/luck-wheel/luck-wheel.module';
import {ContactUsFormModule} from "@app/shared/contact-us-form/contact-us.module";
import {ContactUsModule} from "@app/modules/pages/contact-us/contact-us.module";
import {FeatureSliderModule} from '@app/shared/feature-slider/feature-slider.module';
import {RequestRareProductsModule} from "@app/shared/request-rare-products/request-rare-products.module";
import {PopUpAdvModule} from "@app/shared/pop-up-adv/pop-up-adv.module";
import {ProductsPacksSliderModule} from "@app/shared/products-packs-slider/products-packs-slider.module";
import {FooterModule} from "../pages/footer/footer.module";
import {SearchModule} from "@app/shared/search/search.module";
import {BeerSliderModule} from '@app/shared/beer-slider/beer-slider.module';
import {ProductsSliderModule} from "@app/shared/products-slider/products-slider.module";
import {BrandsSliderModule} from "@app/shared/brands-slider/brands-slider.module";
import {HeaderModule} from '../pages/header/header.module';
import {LandingVideoModule} from "@app/shared/landing-video/landing-video.module";
import {ControllerComponent} from './controller/controller.component';
import {AppSectionComponent} from '@app/shared/app-section/app-section.component';
import {LandingFelorComponent} from './landing-pages/landing-felor/landing-felor.component';
import {LandingDefaultComponent} from "@app/modules/landing/landing-pages/landing-default/landing.component";
import {
  LandingRenovationComponent
} from "@app/modules/landing/landing-pages/landing-renovation/landing-renovation.component";
import {
  LandingBazargardonComponent
} from "@app/modules/landing/landing-pages/landing-bazargardon/landing-bazargardon.component";
import {LandingInfoBaseComponent} from './landing-pages/landing-info-base/landing-info-base.component';
import {ShowPointModule} from "@app/shared/show-point/show-point.module";
import {BaseTheme1Component} from "@app/modules/landing/landing-pages/base-theme1/base-theme1.component";
import {BaseTheme2Component} from "@app/modules/landing/landing-pages/base-theme2/base-theme2.component";
import {BaseTheme3Component} from "@app/modules/landing/landing-pages/base-theme3/base-theme3.component";
import {BaseTheme4Component} from "@app/modules/landing/landing-pages/base-theme4/base-theme4.component";
import {BaseTheme5Component} from "@app/modules/landing/landing-pages/base-theme5/base-theme5.component";
import {BaseTheme6Component} from "@app/modules/landing/landing-pages/base-theme6/base-theme6.component"
import {BaseTheme7Component} from './landing-pages/base-theme7/base-theme7.component';
import {BaseTheme8Component} from "@app/modules/landing/landing-pages/base-theme8/base-theme8.component";
import {BaseTheme9Component} from './landing-pages/base-theme9/base-theme9.component';
import {BaseTheme10Component} from './landing-pages/base-theme10/base-theme10.component';
import {BaseTheme11Component} from './landing-pages/base-theme11/base-theme11.component';
import {BaseTheme12Component} from './landing-pages/base-theme12/base-theme12.component';
import {BaseTheme13Component} from './landing-pages/base-theme13/base-theme13.component';
import {BaseTheme14Component} from './landing-pages/base-theme14/base-theme14.component';
import {BaseTheme15Component} from './landing-pages/base-theme15/base-theme15.component';
import {BaseTheme16Component} from './landing-pages/base-theme16/base-theme16.component';
import {BaseTheme17Component} from './landing-pages/base-theme17/base-theme17.component';
import {BaseTheme18Component} from './landing-pages/base-theme18/base-theme18.component';
import {BaseTheme19Component} from './landing-pages/base-theme19/base-theme19.component';
import {BaseTheme20Component} from './landing-pages/base-theme20/base-theme20.component';
import {BaseTheme21Component} from './landing-pages/base-theme21/base-theme21.component';
import {BaseTheme22Component} from './landing-pages/base-theme22/base-theme22.component';
import {BaseTheme23Component} from './landing-pages/base-theme23/base-theme23.component';
import {BaseTheme24Component} from './landing-pages/base-theme24/base-theme24.component';
import {BaseTheme26Component} from './landing-pages/base-theme26/base-theme26.component';
import {LandingISeeComponent} from "@app/modules/landing/landing-pages/landing-iSee/landing-iSee.component";
import {CounterSectionComponent} from "@app/shared/counter-section/counter-section.component";
import {ProductsSlider2Module} from "@app/shared/products-slider-2/products-slider-2.module";
import {MegaMenuModule} from "@app/shared/mega-menu/mega-menu.module";
import {LandingMotoleadComponent} from './landing-pages/landing-motolead/landing-motolead.component';
import { LandingZiniComponent } from './landing-pages/landing-zini/landing-zini.component';
import { LandingAdakComponent } from './landing-pages/landing-adak/landing-adak.component';

@NgModule({
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    LuckWheelModule,
    FooterModule,
    BeerSliderModule,
    SearchModule,
    ProductsSliderModule,
    ProductsSlider2Module,
    BrandsSliderModule,
    HeaderModule,
    LandingVideoModule,
    ContactUsFormModule,
    ContactUsModule,
    FeatureSliderModule,
    RequestRareProductsModule,
    PopUpAdvModule,
    ProductsPacksSliderModule,
    ShowPointModule,
    MegaMenuModule
  ],
  declarations: [
    ControllerComponent,
    AppSectionComponent,
    CounterSectionComponent,
    LandingRenovationComponent,
    LandingBazargardonComponent,
    LandingInfoBaseComponent,
    LandingFelorComponent,
    LandingISeeComponent,
    LandingDefaultComponent,
    BaseTheme1Component,
    BaseTheme2Component,
    BaseTheme3Component,
    BaseTheme4Component,
    BaseTheme5Component,
    BaseTheme6Component,
    BaseTheme7Component,
    BaseTheme8Component,
    BaseTheme9Component,
    BaseTheme10Component,
    BaseTheme11Component,
    BaseTheme12Component,
    BaseTheme13Component,
    BaseTheme14Component,
    BaseTheme15Component,
    BaseTheme16Component,
    BaseTheme17Component,
    BaseTheme18Component,
    BaseTheme19Component,
    BaseTheme20Component,
    BaseTheme21Component,
    BaseTheme22Component,
    BaseTheme23Component,
    BaseTheme24Component,
    BaseTheme26Component,
    LandingMotoleadComponent,
    LandingZiniComponent,
    LandingAdakComponent,
  ],
  exports: [
    AppSectionComponent,
    CounterSectionComponent,
  ]
})
export class LandingModule {
}
