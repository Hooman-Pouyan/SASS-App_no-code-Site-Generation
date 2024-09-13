import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RateStarComponent } from './rate-star.component';
import { SharedModule } from '../shared.module';



@NgModule({
  declarations: [
    RateStarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RateStarComponent
  ]
})
export class RateStarModule { }
