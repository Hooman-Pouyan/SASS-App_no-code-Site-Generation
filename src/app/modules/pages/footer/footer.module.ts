import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from "@app/shared/shared.module";
import {RenovationFooterComponent} from "./footers/renovation-footer/renovation-footer.component";
import { ControllerComponent } from './controller/controller.component';
import {DefaultFooterComponent} from "./footers/default-footer/default-footer.component";
import {FooterRoutingModule} from "./footer-routing.module";
import {LawsModule} from "@app/modules/pages/laws/laws.module";


@NgModule({
  declarations: [
    ControllerComponent,
    RenovationFooterComponent,
    DefaultFooterComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FooterRoutingModule,
    LawsModule
  ],
  exports: [
    ControllerComponent
  ]
})
export class FooterModule {
}
