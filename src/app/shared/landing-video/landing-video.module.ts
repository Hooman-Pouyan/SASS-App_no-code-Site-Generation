import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingVideoComponent} from './landing-video.component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    LandingVideoComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LandingVideoComponent
  ]
})
export class LandingVideoModule {
}
