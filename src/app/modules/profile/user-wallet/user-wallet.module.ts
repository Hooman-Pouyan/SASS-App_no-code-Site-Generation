import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserWalletRoutingModule } from './user-wallet-routing.module';
import { UserWalletComponent } from './user-wallet.component';
import {SharedModule} from "@app/shared/shared.module";
import {CreditDialogComponent} from "@app/modules/profile/user-wallet/credit-dialog/credit-dialog.component";


@NgModule({
  declarations: [
    UserWalletComponent,
    CreditDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserWalletRoutingModule
  ]
})
export class UserWalletModule { }
