import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CooperationRoutingModule} from './cooperation-routing.module';
import {CooperationComponent} from './cooperation.component';
import {SharedModule} from "@app/shared/shared.module";
import {HeaderModule} from "@app/modules/pages/header/header.module";
import {FooterModule} from "@app/modules/pages/footer/footer.module";


@NgModule({
  declarations: [
    CooperationComponent
  ],
  imports: [
    CommonModule,
    CooperationRoutingModule,
    SharedModule,
    HeaderModule,
    FooterModule
  ]
})
export class CooperationModule {
}
