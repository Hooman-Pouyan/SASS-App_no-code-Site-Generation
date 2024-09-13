import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserFavoriteRoutingModule} from './user-favorite-routing.module';
import {UserFavoriteComponent} from './user-favorite.component';
import {FavouriteModule} from "@app/modules/store/stores/default-store/favourite/favourite.module";


@NgModule({
  declarations: [
    UserFavoriteComponent
  ],
  imports: [
    CommonModule,
    UserFavoriteRoutingModule,
    FavouriteModule
  ]
})
export class UserFavoriteModule {
}
