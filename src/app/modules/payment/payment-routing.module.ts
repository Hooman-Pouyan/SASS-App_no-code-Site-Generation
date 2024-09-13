import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PaymentStatusComponent} from "./payment-status/payment-status.component";
import {PaymentComponent} from "./payment.component";

const routes: Routes = [
  {
    path: '',
    component: PaymentStatusComponent,
  },
  {
    path: 'pay',
    component: PaymentComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {
}
