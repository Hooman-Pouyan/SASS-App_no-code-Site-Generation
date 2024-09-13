import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerSliderComponent } from './beer-slider.component';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    BeerSliderComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    BeerSliderComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BeerSliderModule { }
