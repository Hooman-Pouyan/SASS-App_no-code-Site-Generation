import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "@app/shared/shared.module";
import {ContactUsRoutingModule} from "@app/modules/pages/contact-us/contact-us-routing.module";
import {HeaderModule} from "@app/modules/pages/header/header.module";
import {FooterModule} from "@app/modules/pages/footer/footer.module";
import {ControllerComponent} from './controller/controller.component';
import {DefaultContactUsComponent} from './components/default-contact-us/default-contact-us.component';
import { MotoleadContactUsComponent } from './components/motolead-contact-us/motolead-contact-us.component';


@NgModule({
  declarations: [
    ControllerComponent,
    DefaultContactUsComponent,
    MotoleadContactUsComponent
  ],
  exports: [
    DefaultContactUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ContactUsRoutingModule,
    HeaderModule,
    FooterModule
  ]
})
export class ContactUsModule {
}
