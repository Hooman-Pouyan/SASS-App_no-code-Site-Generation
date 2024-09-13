import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsPacksSliderComponent} from './products-packs-slider.component';
import {SharedModule} from "@app/shared/shared.module";
import {ProductsSliderModule} from "@app/shared/products-slider/products-slider.module";


@NgModule({
  declarations: [
    ProductsPacksSliderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsSliderModule
  ],
  exports: [
    ProductsPacksSliderComponent
  ]
})
export class ProductsPacksSliderModule {
}
