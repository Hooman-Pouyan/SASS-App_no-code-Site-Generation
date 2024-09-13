import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderRoutingModule} from './header-routing.module';
import {ControllerComponent} from './controller/controller.component';
import {SharedModule} from "@app/shared/shared.module";
import {DefaultHeaderComponent} from "./headers/default-header/default-header.component";
import {RenovationHeaderComponent} from './headers/renovation-header/renovation-header.component';
import {SearchModule} from '@app/shared/search/search.module';
import {ShowPointModule} from "@app/shared/show-point/show-point.module";
import {DarkHeaderComponent} from './headers/dark-header/dark-header.component';
import {SearchDialogModule} from '@app/shared/search-dialog/search-dialog.module';
import {MegaMenuModule} from "@app/shared/mega-menu/mega-menu.module";
import { MegaHeaderComponent } from './headers/mega-header/mega-header.component';
import { MotoleadHeaderComponent } from './headers/motolead-header/motolead-header.component';
import {DynamicNestedMenuModule} from "@app/shared/dynamic-nested-menu/dynamic-nested-menu.module";


@NgModule({
  declarations: [
    ControllerComponent,
    DefaultHeaderComponent,
    RenovationHeaderComponent,
    DarkHeaderComponent,
    MegaHeaderComponent,
    MotoleadHeaderComponent
  ],
    imports: [
        CommonModule,
        HeaderRoutingModule,
        SharedModule,
        SearchModule,
        ShowPointModule,
        SearchDialogModule,
        MegaMenuModule,
        DynamicNestedMenuModule
    ],
  exports: [
    ControllerComponent
  ]
})
export class HeaderModule {
}
