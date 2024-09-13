import {NgModule} from '@angular/core';
import {FrequentlyAskedQuestionsRoutingModule} from './frequently-asked-questions-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {FrequentlyAskedQuestionsComponent} from './frequently-asked-questions.component';
import {FooterModule} from "../footer/footer.module";
import {HeaderModule} from "../header/header.module";

@NgModule({
  imports: [
    SharedModule,
    FrequentlyAskedQuestionsRoutingModule,
    FooterModule,
    HeaderModule
  ],
  declarations: [
    FrequentlyAskedQuestionsComponent
  ],
  exports: [
    FrequentlyAskedQuestionsComponent
  ]


})
export class FrequentlyAskedQuestionsModule {
}
