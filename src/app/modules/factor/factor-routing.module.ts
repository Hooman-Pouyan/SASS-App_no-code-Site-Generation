import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'renovation',
        // loadChildren
      },
      {
        path: '',
        loadChildren: () => import('./default-factor/default-factor.module').then(m => m.DefaultFactorModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FactorRoutingModule { }
