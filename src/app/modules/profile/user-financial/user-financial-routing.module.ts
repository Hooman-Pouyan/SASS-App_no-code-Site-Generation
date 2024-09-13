import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FinancialDetailComponent} from "@app/modules/profile/user-financial/financial-detail/financial-detail.component";
import {UserFinancialComponent} from "@app/modules/profile/user-financial/user-financial.component";


const routes: Routes = [
  {
    path: '',
    component: UserFinancialComponent
  },
  {
    path: 'detail/:id',
    component: FinancialDetailComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserFinancialRoutingModule { }
