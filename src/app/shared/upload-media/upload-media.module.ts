import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UploadMediaComponent} from './upload-media.component';
import {NgxPhotoEditorModule} from "ngx-photo-editor";
import {FlexModule} from "@angular/flex-layout";
import {MaterialModule} from "@app/shared/material/material.module";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    UploadMediaComponent,
  ],
  imports: [
    CommonModule,
    NgxPhotoEditorModule,
    FlexModule,
    MaterialModule,
    TranslateModule,
  ],
  exports: [
    UploadMediaComponent
  ]
})
export class UploadMediaModule {
}
