import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RenovationStoreComponent} from "./renovation-store.component";
import {StoreSubCategoriesComponent} from "./store-sub-categories/store-sub-categories.component";
import {RenovationPreStoreComponent} from './renovation-pre-store/renovation-pre-store.component';

const routes: Routes = [
  {
    path: '',
    component: RenovationPreStoreComponent,
  },
  // {
  //   path: 'pre-store',
  //   component: RenovationPreStoreComponent
  // },
  {
    path: ':id',
    component: StoreSubCategoriesComponent,
  },
  {
    path: ':id/:id',
    component: StoreSubCategoriesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RenovationStoreRoutingModule {
}
