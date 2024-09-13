import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestRareProductsComponent } from './request-rare-products.component';
import { SharedModule } from '../shared.module';
import {UploadMediaModule} from "@app/shared/upload-media/upload-media.module";



@NgModule({
  declarations: [
    RequestRareProductsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UploadMediaModule
  ],
  exports: [
    RequestRareProductsComponent
  ]
})
export class RequestRareProductsModule { }
