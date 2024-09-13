import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserInviteFriendsRoutingModule } from './user-invite-friends-routing.module';
import {InviteFriendsComponent} from "@app/modules/profile/invite-friends/invite-friends.component";
import {SharedModule} from "@app/shared/shared.module";
import {InviteFriendsModule} from "@app/modules/store/stores/default-store/invite-friends/invite-friends.module";


@NgModule({
  declarations: [
    InviteFriendsComponent
  ],
  imports: [
    CommonModule,
    UserInviteFriendsRoutingModule,
    SharedModule,
    InviteFriendsModule,
  ]
})
export class UserInviteFriendsModule { }
