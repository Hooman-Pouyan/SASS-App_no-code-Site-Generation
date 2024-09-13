import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReturnOfGoodsComponent } from './return-of-goods.component';

const routes: Routes = [
  {
    path: '',
    component: ReturnOfGoodsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReturnOfGoodsRoutingModule { }
