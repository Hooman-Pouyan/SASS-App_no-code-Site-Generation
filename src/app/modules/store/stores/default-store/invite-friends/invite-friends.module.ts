import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InviteFriendsRoutingModule } from './invite-friends-routing.module';
import { InviteFriendsComponent } from './invite-friends.component';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    InviteFriendsComponent
  ],
  imports: [
    CommonModule,
    InviteFriendsRoutingModule,
    SharedModule
  ],
  exports: [
    InviteFriendsComponent
  ]
})
export class InviteFriendsModule { }
