import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaymentDialogComponent} from './payment-dialog.component';
import {SharedModule} from "@app/shared/shared.module";
import {PaymentCardToCardComponent} from './components/payment-card-to-card/payment-card-to-card.component';
import {PaymentChequeComponent} from './components/payment-cheque/payment-cheque.component';


@NgModule({
  declarations: [
    PaymentDialogComponent,
    PaymentCardToCardComponent,
    PaymentChequeComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PaymentDialogComponent,
    PaymentCardToCardComponent,
    PaymentChequeComponent
  ]
})
export class PaymentDialogModule {
}
