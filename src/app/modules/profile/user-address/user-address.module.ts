import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAddressRoutingModule } from './user-address-routing.module';
import {UserAddressComponent} from "@app/modules/profile/user-address/user-address.component";
import {SharedModule} from "@app/shared/shared.module";
import {AddressDialogModule} from "@app/shared/address-dialog/address-dialog.module";


@NgModule({
  declarations: [
    UserAddressComponent
  ],
  imports: [
    CommonModule,
    UserAddressRoutingModule,
    SharedModule,
    AddressDialogModule
  ]
})
export class UserAddressModule { }
