import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserFinancialRoutingModule} from './user-financial-routing.module';
import {UserFinancialComponent} from './user-financial.component';
import {SharedModule} from "@app/shared/shared.module";
import {FinancialDetailComponent} from "@app/modules/profile/user-financial/financial-detail/financial-detail.component";

@NgModule({
  declarations: [
    UserFinancialComponent,
    FinancialDetailComponent
  ],
  imports: [
    CommonModule,
    UserFinancialRoutingModule,
    SharedModule
  ]
})
export class UserFinancialModule {
}
