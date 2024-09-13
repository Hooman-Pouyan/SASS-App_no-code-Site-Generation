import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NewsRoutingModule} from './news-routing.module';
import {NewsComponent} from './news.component';
import {HeaderModule} from "@app/modules/pages/header/header.module";
import {FooterModule} from "@app/modules/pages/footer/footer.module";
import {SharedModule} from "@app/shared/shared.module";
import {NewsViewComponent} from './components/news-view/news-view.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    NewsComponent,
    NewsViewComponent,
  ],
  imports: [
    CommonModule,
    NewsRoutingModule,
    HeaderModule,
    FooterModule,
    SharedModule,
    TranslateModule
  ]
})
export class NewsModule {
}
