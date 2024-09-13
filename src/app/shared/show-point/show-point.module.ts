import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowPointComponent } from './show-point.component';
import {SharedModule} from "@app/shared/shared.module";



@NgModule({
  declarations: [
    ShowPointComponent
  ],
  exports: [
    ShowPointComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ShowPointModule { }
