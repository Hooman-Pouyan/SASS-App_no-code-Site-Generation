import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AddressDialogComponent} from './address-dialog.component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    AddressDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    AddressDialogComponent
  ]
})
export class AddressDialogModule {
}
