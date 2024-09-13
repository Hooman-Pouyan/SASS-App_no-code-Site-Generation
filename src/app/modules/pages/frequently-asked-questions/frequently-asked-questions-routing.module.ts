import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FrequentlyAskedQuestionsComponent } from './frequently-asked-questions.component';

const routes: Routes = [
  {
    path: '',
    component: FrequentlyAskedQuestionsComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrequentlyAskedQuestionsRoutingModule { }
