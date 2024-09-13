import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CategoriesComponent} from './categories.component';
import {MainCategoriesComponent} from './main-categories/main-categories.component';
import {CategoryProductsListComponent} from "@app/modules/store/stores/default-store/categories/category-products-list/category-products-list.component";

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
    children: [
      {
        path: '',
        component: MainCategoriesComponent
      },
      {
        path: ':id',
        component: CategoryProductsListComponent
      },
      {
        path: ':id/:slug',
        component: CategoryProductsListComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {
}
