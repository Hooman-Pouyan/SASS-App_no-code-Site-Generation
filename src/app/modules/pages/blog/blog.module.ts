import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BlogRoutingModule} from './blog-routing.module';
import {BlogComponent} from './blog.component';
import {HeaderModule} from "@app/modules/pages/header/header.module";
import {FooterModule} from "@app/modules/pages/footer/footer.module";
import {SharedModule} from "@app/shared/shared.module";
import {BlogViewComponent} from './components/blog-view/blog-view.component';
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [
    BlogComponent,
    BlogViewComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    HeaderModule,
    FooterModule,
    SharedModule,
    TranslateModule
  ]
})
export class BlogModule {
}
