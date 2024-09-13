import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ControllerComponent} from "@app/modules/pages/contact-us/controller/controller.component";

const routes: Routes = [
  {
    path: '',
    component: ControllerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactUsRoutingModule { }
