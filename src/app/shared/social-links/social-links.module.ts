import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SocialLinksComponent} from './social-links.component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    SocialLinksComponent
  ],
  exports: [
    SocialLinksComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class SocialLinksModule {
}
