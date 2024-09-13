import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserClubComponent } from './user-club.component';
import { SharedModule } from '@app/shared/shared.module';
import { UserClubRoutingModule } from './user-club-routing.module';
import {ShowPointModule} from "@app/shared/show-point/show-point.module";



@NgModule({
  declarations: [
    UserClubComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    UserClubRoutingModule,
    ShowPointModule
  ]
})
export class UserClubModule { }
