import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LawsComponent} from "./laws.component";
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    LawsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    LawsComponent
  ]
})
export class LawsModule {
}
