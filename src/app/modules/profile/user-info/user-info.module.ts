import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserInfoRoutingModule} from './user-info-routing.module';
import {UserInfoComponent} from './user-info.component';
import {SharedModule} from "@app/shared/shared.module";
import {RateStarModule} from '@app/shared/rate-star/rate-star.module';
import {UserChangePasswordDialogComponent} from "@app/modules/profile/user-info/user-change-password-dialog/user-change-password-dialog.component";


@NgModule({
  declarations: [
    UserInfoComponent,
    UserChangePasswordDialogComponent
  ],
  imports: [
    CommonModule,
    UserInfoRoutingModule,
    SharedModule,
    RateStarModule
  ]
})
export class UserInfoModule {
}
