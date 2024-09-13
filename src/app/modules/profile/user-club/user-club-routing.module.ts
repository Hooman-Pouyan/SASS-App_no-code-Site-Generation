import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserClubComponent} from './user-club.component';


const routes: Routes = [
  {
    path: '',
    component: UserClubComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserClubRoutingModule {
}
