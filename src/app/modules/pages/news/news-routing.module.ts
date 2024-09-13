import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NewsComponent} from "@app/modules/pages/news/news.component";
import {NewsViewComponent} from "@app/modules/pages/news/components/news-view/news-view.component";

const routes: Routes = [
  {
    path: '',
    component: NewsComponent
  },
  {
    path: ':id',
    component: NewsViewComponent
  },
  {
    path: ':id/:slug',
    component: NewsViewComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewsRoutingModule { }
