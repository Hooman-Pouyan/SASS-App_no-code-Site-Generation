import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartComponent} from "@app/shared/cart-sidenav/cart/cart.component";
import {SharedModule} from "@app/shared/shared.module";
import {NotebookComponent} from "@app/shared/cart-sidenav/notebook/notebook.component";
import { CartSidenavComponent } from './cart-sidenav.component';



@NgModule({
  declarations: [
    CartComponent,
    NotebookComponent,
    CartSidenavComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    CartSidenavComponent
  ]
})
export class CartSidenavModule { }
