import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultStoreComponent} from "./default-store.component";

const routes: Routes =[
  {
    path: '',
    component: DefaultStoreComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./main-page/main-page.module').then(m => m.MainPageModule),
      },
      {
        path: 'favourite',
        loadChildren: () => import('./favourite/favourite.module').then(m => m.FavouriteModule),
      },
      {
        path: 'category',
        loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule),
      },
      {
        path: 'invite-friends',
        loadChildren: () => import('./invite-friends/invite-friends.module').then(m => m.InviteFriendsModule),
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultStoreRoutingModule { }
