import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxImageZoomModule} from 'ngx-image-zoom';
import {FlexLayoutModule} from "@angular/flex-layout";
import {RouterModule} from '@angular/router';
import {ConfirmComponent} from './confirm/confirm.component';
import {LoadingComponent} from './loading/loading.component';
import {MaterialModule} from './material/material.module';
import {SortByPipe} from './pipes/sort-by.pipe';
import {JalaliDatePipe} from './pipes/jalali-date.pipe';
import {NumberPipe} from './pipes/number.pipe';
import {ForgetPassComponent} from '../modules/authentication/login/components/forget-pass/forget-pass.component';
import {PhoneSupportDialogComponent} from './phone-support-dialog/phone-support-dialog.component';
import {IphoneGuideDialogComponent} from './iphone-guide-dialog/iphone-guide-dialog.component';
import {SafePipe} from "src/app/shared/pipes/safe.pipe";
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {JalaliMomentDateAdapter} from "./mat-core/jalali-moment-date-adapter";
import {JALALI_MOMENT_FORMATS} from "./mat-core/jalali_moment_formats";
import {CustomSwitchPipe} from './pipes/custom-switch.pipe';
import {TranslateModule} from "@ngx-translate/core";
import {SwiperModule} from 'swiper/angular';
import {ScrollToTopComponent} from './scroll-to-top/scroll-to-top.component';
import {ImageLazyModule} from "@app/shared/image-lazy/image-lazy.module";
import {CustomMatPaginatorIntl} from "@app/shared/mat-core/custom_mat_paginator";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from "@angular/material/form-field";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {NgxImageCompressService} from 'ngx-image-compress';
import {NoDecimalPipe} from "@app/shared/pipes/no-decimal.pipe";
import {NoDecimalDirective} from './directives/no-decimal.directive';
import {EditElementDialogComponent} from './edit-element-dialog/edit-element-dialog.component';
import {EditElementDirective} from "@app/shared/directives/edit-element.directive";
import {EditMediaElementDialogComponent} from './edit-media-element-dialog/edit-media-element-dialog.component';
import {LimitCharacterDirective} from './directives/limit-character.directive';
import {ImgErrorDirective} from './directives/img-error.directive';
import {CounterUpDirective} from './directives/counter-up.directive';
import {NgwWowModule} from "ngx-wow";
import {MobileSectionComponent} from "@app/shared/mobile-section/mobile-section.component";
import {UploadMediaModule} from "@app/shared/upload-media/upload-media.module";
import { CallToBuyComponent } from './call-to-buy/call-to-buy.component';

const pipes: any[] = [
  JalaliDatePipe,
  SortByPipe,
  SafePipe,
  NumberPipe,
  CustomSwitchPipe,
  NoDecimalPipe
]

const directives: any[] = [
  NoDecimalDirective,
  EditElementDirective,
  LimitCharacterDirective,
  ImgErrorDirective,
  CounterUpDirective
]

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    NgxImageZoomModule,
    TranslateModule,
    SwiperModule,
    ImageLazyModule,
    UploadMediaModule,
    NgwWowModule
  ],
  declarations: [
    LoadingComponent,
    ConfirmComponent,
    ForgetPassComponent,
    PhoneSupportDialogComponent,
    IphoneGuideDialogComponent,
    ScrollToTopComponent,
    pipes,
    directives,
    EditElementDialogComponent,
    EditMediaElementDialogComponent,
    MobileSectionComponent,
    CallToBuyComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxImageZoomModule,
    FlexLayoutModule,
    MaterialModule,
    TranslateModule,
    ImageLazyModule,
    SwiperModule,
    UploadMediaModule,
    NgwWowModule,
    LoadingComponent,
    ConfirmComponent,
    ForgetPassComponent,
    PhoneSupportDialogComponent,
    IphoneGuideDialogComponent,
    ScrollToTopComponent,
    MobileSectionComponent,
    CallToBuyComponent,
    pipes,
    directives
  ],
  providers: [
    NgxImageCompressService,
    {provide: DateAdapter, useClass: JalaliMomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: JALALI_MOMENT_FORMATS},
    {provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}
  ],
})
export class SharedModule {
}
