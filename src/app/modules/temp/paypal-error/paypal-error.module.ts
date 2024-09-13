import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaypalErrorRoutingModule } from './paypal-error-routing.module';
import { PaypalErrorComponent } from './paypal-error.component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    PaypalErrorComponent
  ],
    imports: [
        CommonModule,
        PaypalErrorRoutingModule,
        SharedModule
    ]
})
export class PaypalErrorModule { }
