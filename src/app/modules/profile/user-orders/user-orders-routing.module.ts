import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserOrdersComponent} from "@app/modules/profile/user-orders/user-orders.component";
import {UserOrdersDetailComponent} from "@app/modules/profile/user-orders/user-orders-detail/user-orders-detail.component";


const routes: Routes = [
  {
    path: '',
    component: UserOrdersComponent
  },
  {
    path: ':id',
    component: UserOrdersDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserOrdersRoutingModule {
}
