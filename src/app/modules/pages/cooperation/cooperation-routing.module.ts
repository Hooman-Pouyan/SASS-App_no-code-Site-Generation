import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CooperationComponent} from "@app/modules/pages/cooperation/cooperation.component";

const routes: Routes = [{
  path: '',
  component: CooperationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CooperationRoutingModule { }
