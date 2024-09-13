import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ControllerComponent} from "./controller/controller.component";
import {ProductResolver} from "@app/modules/product/resolvers/product.resolver";

const routes: Routes = [
  {
    path: ':id',
    component: ControllerComponent,
    resolve: {product: ProductResolver}
  },
  {
    path: ':id/:slug',
    component: ControllerComponent,
    resolve: {product: ProductResolver}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
