import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {LayoutComponent} from "./modules/layout/layout.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule),
      },
      {
        path: 'auth',
        loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
      },
      {
        path: 'store',
        loadChildren: () => import('./modules/store/store.module').then(m => m.StoreModule),
      },
      {
        path: 'product',
        loadChildren: () => import('./modules/product/product.module').then(m => m.ProductModule),
      },
      {
        path: 'about-us',
        loadChildren: () => import('./modules/pages/about-us/about-us.module').then(m => m.AboutUsModule),
      },
      {
        path: 'return-of',
        loadChildren: () => import('./modules/pages/return-of-goods/return-of-goods.module').then(m => m.ReturnOfGoodsModule),
      },
      {
        path: 'questions',
        loadChildren: () => import('./modules/pages/frequently-asked-questions/frequently-asked-questions.module').then(m => m.FrequentlyAskedQuestionsModule),
      },
      {
        path: 'help',
        loadChildren: () => import('./modules/pages/help/help.module').then(m => m.HelpModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
      },
      {
        path: 'factor',
        loadChildren: () => import('./modules/factor/factor.module').then(m => m.FactorModule),
      },
      {
        path: 'projects',
        loadChildren: () => import('./modules/projects/projects.module').then(m => m.ProjectsModule),
      },
      {
        path: 'blogs',
        loadChildren: () => import('./modules/pages/blog/blog.module').then(m => m.BlogModule),
      },
      {
        path: 'compare',
        loadChildren: () => import('./modules/pages/compare/compare.module').then(m => m.CompareModule),
      },
      {
        path: 'news',
        loadChildren: () => import('./modules/pages/news/news.module').then(m => m.NewsModule),
      },
      {
        path: 'contact-us',
        loadChildren: () => import('./modules/pages/contact-us/contact-us.module').then(m => m.ContactUsModule),
      },
      {
        path: 'cooperation',
        loadChildren: () => import('./modules/pages/cooperation/cooperation.module').then(m => m.CooperationModule),
      },
      {
        path: 'positions',
        loadChildren: () => import('./modules/pages/job-positions/job-positions.module').then(m => m.JobPositionsModule),
      },
      {
        path: 'quiz',
        loadChildren: () => import('./modules/pages/quiz/quiz.module').then(m => m.QuizModule),
      },
      {
        path: 'error',
        loadChildren: () => import('./shared/error-page/error-page.module').then(m => m.ErrorPageModule)
      },
    ]
  },
  {
    path: 'payment-status',
    loadChildren: () => import('./modules/payment/payment.module').then(m => m.PaymentModule),
  },
  {
    path: 'paypal-error',
    loadChildren: () => import('./modules/temp/paypal-error/paypal-error.module').then(m => m.PaypalErrorModule),
  },
  {
    path: 'undefined',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
