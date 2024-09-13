import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from "./login.component";
import { DefaultLoginComponent } from "./logins/default-login/default-login.component";
import { RenovationLoginComponent } from "./logins/renovation-login/renovation-login.component";
import { SharedModule } from "../../../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    DefaultLoginComponent,
    RenovationLoginComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
