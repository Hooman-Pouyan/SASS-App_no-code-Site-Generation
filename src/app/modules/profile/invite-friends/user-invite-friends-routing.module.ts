import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {InviteFriendsComponent} from "@app/modules/profile/invite-friends/invite-friends.component";


const routes: Routes = [
  {
    path: '',
    component: InviteFriendsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserInviteFriendsRoutingModule {
}
