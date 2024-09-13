import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsSlider2Component} from './products-slider-2.component';
import {SharedModule} from "../shared.module";
import {ProductSlide2Component} from './product-slide-2/product-slide-2.component';

@NgModule({
  declarations: [
    ProductsSlider2Component,
    ProductSlide2Component,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ProductsSlider2Component,
    ProductSlide2Component,
  ]
})
export class ProductsSlider2Module {
}
