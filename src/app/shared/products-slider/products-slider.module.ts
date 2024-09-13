import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductsSliderComponent} from './products-slider.component';
import {SharedModule} from "../shared.module";
import { ProductSlideComponent } from './product-slide/product-slide.component';
import { ProductSlideMobileComponent } from './product-slide-mobile/product-slide-mobile.component';


@NgModule({
  declarations: [
    ProductsSliderComponent,
    ProductSlideComponent,
    ProductSlideMobileComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
    exports: [
        ProductsSliderComponent,
        ProductSlideComponent,
        ProductSlideMobileComponent,
    ]
})
export class ProductsSliderModule {
}
