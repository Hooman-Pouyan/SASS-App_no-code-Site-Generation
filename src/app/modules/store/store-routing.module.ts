import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StoreComponent} from "./store.component";
import {NoSignUpGuard} from "@app/core/guards/no-sign-up.guard";

const routes: Routes = [
  {
    path: '',
    component: StoreComponent,
    canActivate: [NoSignUpGuard],
    children: [
      {
        path: 'renovation',
        loadChildren: () => import('./stores/renovation-store/renovation-store.module').then(m => m.RenovationStoreModule),
      },
      {
        path: '',
        loadChildren: () => import('./stores/default-store/default-store.module').then(m => m.DefaultStoreModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
