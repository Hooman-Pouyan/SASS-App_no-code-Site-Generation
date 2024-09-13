import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageRoutingModule } from './main-page-routing.module';
import { MainPageComponent } from './main-page.component';
import {SharedModule} from "@app/shared/shared.module";
import {ProductsSliderModule} from "@app/shared/products-slider/products-slider.module";
import {BrandsSliderModule} from "@app/shared/brands-slider/brands-slider.module";
import {LandingModule} from "@app/modules/landing/landing.module";


@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    MainPageRoutingModule,
    SharedModule,
    ProductsSliderModule,
    BrandsSliderModule,
    LandingModule
  ]
})
export class MainPageModule { }
