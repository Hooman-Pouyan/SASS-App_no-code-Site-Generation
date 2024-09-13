import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MegaMenuComponent} from "@app/shared/mega-menu/mega-menu.component";
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    MegaMenuComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    MegaMenuComponent
  ],
})
export class MegaMenuModule { }
