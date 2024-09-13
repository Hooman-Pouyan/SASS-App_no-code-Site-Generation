import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {JobPositionsComponent} from "@app/modules/pages/job-positions/job-positions.component";

const routes: Routes = [
  {
    path: '',
    component: JobPositionsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobPositionsRoutingModule {
}
