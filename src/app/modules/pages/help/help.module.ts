import {NgModule} from '@angular/core';
import {SharedModule} from '@app/shared/shared.module';
import {HelpRoutingModule} from './help-routing.module';
import {HelpComponent} from './help.component';
import {FooterModule} from "../footer/footer.module";
import {HeaderModule} from "../header/header.module";

@NgModule({
  imports: [
    SharedModule,
    HelpRoutingModule,
    FooterModule,
    HeaderModule,
  ],
  declarations: [
    HelpComponent,
  ],
  exports: [
    HelpComponent,
  ]
})
export class HelpModule {
}
