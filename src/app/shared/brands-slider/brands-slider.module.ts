import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrandsSliderComponent} from './brands-slider.component';
import {SharedModule} from "../shared.module";


@NgModule({
  declarations: [
    BrandsSliderComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    BrandsSliderComponent
  ]
})
export class BrandsSliderModule {
}
