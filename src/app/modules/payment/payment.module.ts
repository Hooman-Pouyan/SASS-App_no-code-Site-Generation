import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentRoutingModule} from './payment-routing.module';
import {PaymentComponent} from './payment.component';
import {SharedModule} from "@app/shared/shared.module";
import {PaymentStatusComponent} from "./payment-status/payment-status.component";


@NgModule({
  declarations: [
    PaymentComponent,
    PaymentStatusComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    SharedModule
  ]
})
export class PaymentModule {
}
