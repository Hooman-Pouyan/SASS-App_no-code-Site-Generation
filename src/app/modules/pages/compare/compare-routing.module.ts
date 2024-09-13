import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CompareComponent} from "@app/modules/pages/compare/compare.component";

const routes: Routes = [
  {
    path: '',
    component: CompareComponent
  },
  {
    path: ':id1',
    component: CompareComponent
  },
  {
    path: ':id1/:id2',
    component: CompareComponent
  },
  {
    path: ':id1/:id2/:id3',
    component: CompareComponent
  },
  {
    path: ':id1/:id2/:id3/:id4',
    component: CompareComponent
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompareRoutingModule { }
