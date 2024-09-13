import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ControllerComponent} from "./controller/controller.component";

const routes: Routes = [
  {
    path: '', component: ControllerComponent,
  },
  {
    path: 'landing/:slug', component: ControllerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule {
}
