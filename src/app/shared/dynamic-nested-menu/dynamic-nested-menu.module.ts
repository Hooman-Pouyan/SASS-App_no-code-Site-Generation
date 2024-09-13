import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DynamicNestedMenuComponent} from './dynamic-nested-menu.component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    DynamicNestedMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    DynamicNestedMenuComponent
  ]
})
export class DynamicNestedMenuModule {
}
