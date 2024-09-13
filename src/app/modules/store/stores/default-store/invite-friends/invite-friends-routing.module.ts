import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InviteFriendsComponent } from './invite-friends.component';
import {AuthGuard} from "@app/core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: InviteFriendsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InviteFriendsRoutingModule { }
