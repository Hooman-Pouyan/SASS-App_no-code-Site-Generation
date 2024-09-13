import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CategoriesRoutingModule} from './categories-routing.module';
import {CategoriesComponent} from './categories.component';
import {SharedModule} from "@app/shared/shared.module";
import {ProductsFilterComponent} from './containers/products-filter/products-filter.component';
import {MainCategoriesComponent} from './main-categories/main-categories.component';
import {FooterModule} from "@app/modules/pages/footer/footer.module";
import {CategoryProductsListComponent} from './category-products-list/category-products-list.component';
import {ProductsSliderModule} from '@app/shared/products-slider/products-slider.module';


@NgModule({
  declarations: [
    CategoriesComponent,
    ProductsFilterComponent,
    MainCategoriesComponent,
    CategoryProductsListComponent,
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    ProductsSliderModule,
    FooterModule
  ]
})
export class CategoriesModule {
}
