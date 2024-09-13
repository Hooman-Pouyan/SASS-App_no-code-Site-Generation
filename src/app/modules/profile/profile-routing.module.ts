import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProfileComponent} from './profile.component';
import {AuthGuard} from "@app/core/guards/auth.guard";
import {NoSignUpGuard} from "@app/core/guards/no-sign-up.guard";

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    canActivate: [AuthGuard, NoSignUpGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./user-info/user-info.module').then(m => m.UserInfoModule)
      },
      {
        path: 'user-info',
        loadChildren: () => import('./user-info/user-info.module').then(m => m.UserInfoModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./user-orders/user-orders.module').then(m => m.UserOrdersModule)
      },
      {
        path: 'wallet',
        loadChildren: () => import('./user-wallet/user-wallet.module').then(m => m.UserWalletModule)
      },
      {
        path: 'addresses',
        loadChildren: () => import('./user-address/user-address.module').then(m => m.UserAddressModule)
      },
      {
        path: 'financial',
        loadChildren: () => import('./user-financial/user-financial.module').then(m => m.UserFinancialModule)
      },
      {
        path: 'InviteFriends',
        loadChildren: () => import('./invite-friends/user-invite-friends.module').then(m => m.UserInviteFriendsModule)
      },
      {
        path: 'club',
        loadChildren: () => import('./user-club/user-club.module').then(m => m.UserClubModule)
      },
      {
        path: 'favorite',
        loadChildren: () => import('./user-favorite/user-favorite.module').then(m => m.UserFavoriteModule)
      },
      {
        path: 'tickets',
        loadChildren: () => import('./user-ticket/user-ticket.module').then(m => m.UserTicketModule)
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
