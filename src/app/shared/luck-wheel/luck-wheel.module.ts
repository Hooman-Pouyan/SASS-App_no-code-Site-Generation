import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LuckWheelComponent} from './luck-wheel.component';
import {SharedModule} from "../shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {CongratsDialogComponent} from './congrats-dialog/congrats-dialog.component';


@NgModule({
  declarations: [
    LuckWheelComponent,
    CongratsDialogComponent
  ],
  exports: [
    LuckWheelComponent
  ],
  entryComponents: [
    CongratsDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
})
export class LuckWheelModule {
}
