import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultFactorRoutingModule} from './default-factor-routing.module';
import {DefaultFactorComponent} from './default-factor.component';
import {FooterModule} from "@app/modules/pages/footer/footer.module";
import {SharedModule} from "@app/shared/shared.module";
import {FactorInvoiceComponent} from './components/factor-invoice/factor-invoice.component';
import { FactorCartComponent } from './components/factor-cart/factor-cart.component';
import { FactorSettingComponent } from './components/factor-setting/factor-setting.component';
import { FactorAddressComponent } from './components/factor-address/factor-address.component';
import {AddressDialogModule} from "@app/shared/address-dialog/address-dialog.module";
import { FactorCourierSendComponent } from './components/factor-courier-send/factor-courier-send.component';
import {PaymentDialogModule} from "@app/shared/payment-dialog/payment-dialog.module";
import { HeaderModule } from '@app/modules/pages/header/header.module';
import { FactorSpecialCourierComponent } from './components/factor-special-courier/factor-special-courier.component';


@NgModule({
  declarations: [
    DefaultFactorComponent,
    FactorInvoiceComponent,
    FactorCartComponent,
    FactorSettingComponent,
    FactorAddressComponent,
    FactorCourierSendComponent,
    FactorSpecialCourierComponent
  ],
  imports: [
    CommonModule,
    DefaultFactorRoutingModule,
    FooterModule,
    SharedModule,
    AddressDialogModule,
    PaymentDialogModule,
    HeaderModule
  ]
})
export class DefaultFactorModule {
}
