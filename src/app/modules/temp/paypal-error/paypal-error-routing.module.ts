import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaypalErrorComponent} from "@app/modules/temp/paypal-error/paypal-error.component";

const routes: Routes = [{
  path: '',
  component: PaypalErrorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaypalErrorRoutingModule { }
