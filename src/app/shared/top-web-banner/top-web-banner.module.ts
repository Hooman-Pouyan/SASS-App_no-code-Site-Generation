import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TopWebBannerComponent} from './top-web-banner.component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    TopWebBannerComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TopWebBannerComponent
  ]
})
export class TopWebBannerModule {
}
