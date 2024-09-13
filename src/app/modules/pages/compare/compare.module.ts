import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareRoutingModule } from './compare-routing.module';
import { CompareComponent } from './compare.component';
import {SharedModule} from "@app/shared/shared.module";
import {HeaderModule} from "@app/modules/pages/header/header.module";
import {FooterModule} from "@app/modules/pages/footer/footer.module";
import { ComparePickProductComponent } from './compare-pick-product/compare-pick-product.component';


@NgModule({
  declarations: [
    CompareComponent,
    ComparePickProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CompareRoutingModule,
    HeaderModule,
    FooterModule
  ]
})
export class CompareModule { }
