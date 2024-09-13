import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureSliderComponent } from './feature-slider.component';
import { SharedModule } from '../shared.module';
import {FeatureDialogComponent} from "@app/shared/feature-slider/components/feature-dialog/feature-dialog.component";



@NgModule({
  declarations: [
    FeatureSliderComponent,
    FeatureDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    FeatureSliderComponent
  ]
})
export class FeatureSliderModule { }
