import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BlogComponent} from "@app/modules/pages/blog/blog.component";
import {BlogViewComponent} from "@app/modules/pages/blog/components/blog-view/blog-view.component";

const routes: Routes = [
  {
    path: '',
    component: BlogComponent
  },
  {
    path: ':id',
    component: BlogViewComponent
  },
  {
    path: ':id/:slug',
    component: BlogViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
