import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {SharedModule} from "@app/shared/shared.module";
import {RegisterPhoneComponent} from "./register-phone/register-phone.component";
import {HelpModule} from "../../pages/help/help.module";
import {RegisterEmailComponent} from './register-email/register-email.component';
import {RegisterRenovationComponent} from './register-renovation/register-renovation.component';
import {LawsModule} from "@app/modules/pages/laws/laws.module";
import {HeaderModule} from "@app/modules/pages/header/header.module";
import {FooterModule} from "@app/modules/pages/footer/footer.module";


@NgModule({
  declarations: [
    RegisterComponent,
    RegisterPhoneComponent,
    RegisterEmailComponent,
    RegisterRenovationComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    HelpModule,
    LawsModule,
    HeaderModule,
    FooterModule
  ]
})
export class RegisterModule {
}
