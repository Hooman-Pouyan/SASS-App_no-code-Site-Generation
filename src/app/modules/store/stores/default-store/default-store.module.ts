import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DefaultStoreRoutingModule} from './default-store-routing.module';
import {DefaultStoreComponent} from './default-store.component';
import {SharedModule} from 'src/app/shared/shared.module';
import {SearchModule} from 'src/app/shared/search/search.module';
import {FooterModule} from "@app/modules/pages/footer/footer.module";
import {HeaderModule} from "@app/modules/pages/header/header.module";


@NgModule({
  declarations: [
    DefaultStoreComponent
  ],
  imports: [
    CommonModule,
    DefaultStoreRoutingModule,
    SharedModule,
    SearchModule,
    FooterModule,
    HeaderModule
  ]
})
export class DefaultStoreModule {
}
