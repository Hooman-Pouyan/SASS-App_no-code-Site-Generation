import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MiniContactUsComponent} from './mini-contact-us.component';
import {SharedModule} from "@app/shared/shared.module";

@NgModule({
  declarations: [
    MiniContactUsComponent
  ],
  exports: [
    MiniContactUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
})
export class MiniContactUsModule {
}
