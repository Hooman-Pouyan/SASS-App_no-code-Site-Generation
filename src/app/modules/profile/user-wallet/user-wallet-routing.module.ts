import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserWalletComponent} from "@app/modules/profile/user-wallet/user-wallet.component";


const routes: Routes = [
  {
    path: '',
    component: UserWalletComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserWalletRoutingModule { }
