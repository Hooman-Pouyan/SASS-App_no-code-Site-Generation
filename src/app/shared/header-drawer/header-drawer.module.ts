import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderDrawerComponent } from './header-drawer.component';
import {SharedModule} from "@app/shared/shared.module";
import {ShowPointModule} from "@app/shared/show-point/show-point.module";



@NgModule({
    declarations: [
        HeaderDrawerComponent
    ],
    exports: [
        HeaderDrawerComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        ShowPointModule
    ]
})
export class HeaderDrawerModule { }
