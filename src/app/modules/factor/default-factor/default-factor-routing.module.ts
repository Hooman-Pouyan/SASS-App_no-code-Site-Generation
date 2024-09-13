import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DefaultFactorComponent} from "@app/modules/factor/default-factor/default-factor.component";
import {FactorCartComponent} from "@app/modules/factor/default-factor/components/factor-cart/factor-cart.component";
import {FactorSettingComponent} from "@app/modules/factor/default-factor/components/factor-setting/factor-setting.component";
import {FactorResolver} from "@app/modules/factor/default-factor/resolvers/factor.resolver";
import {AuthGuard} from "@app/core/guards/auth.guard";
import {NoSignUpGuard} from "@app/core/guards/no-sign-up.guard";

const routes: Routes = [
  {
    path: '',
    component: DefaultFactorComponent,
    canActivate: [AuthGuard, NoSignUpGuard],
    resolve: { orderData: FactorResolver },
    children: [
      {
        path: '',
        component: FactorCartComponent
      },
      {
        path: 'setting',
        component: FactorSettingComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultFactorRoutingModule {
}
