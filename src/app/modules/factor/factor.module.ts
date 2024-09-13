import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FactorRoutingModule } from './factor-routing.module';
import { RenovationFactorComponent } from './renovation-factor/renovation-factor.component';
import { UploadImageDgComponent } from './renovation-factor/upload-image-dg/upload-image-dg.component';
import { RenovationFactorExpertDgComponent } from './renovation-factor/renovation-factor-expert-dg/renovation-factor-expert-dg.component';
import {SharedModule} from "@app/shared/shared.module";


@NgModule({
  declarations: [
    RenovationFactorComponent,
    UploadImageDgComponent,
    RenovationFactorExpertDgComponent
  ],
    imports: [
        CommonModule,
        FactorRoutingModule,
        SharedModule
    ]
})
export class FactorModule { }
