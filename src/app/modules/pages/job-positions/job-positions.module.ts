import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobPositionsRoutingModule } from './job-positions-routing.module';
import { JobPositionsComponent } from './job-positions.component';
import {SharedModule} from "@app/shared/shared.module";
import {HeaderModule} from "@app/modules/pages/header/header.module";


@NgModule({
  declarations: [
    JobPositionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    JobPositionsRoutingModule,
    HeaderModule
  ]
})
export class JobPositionsModule { }
