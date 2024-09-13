import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProductRoutingModule} from './product-routing.module';
import {ControllerComponent} from './controller/controller.component';
import {DefaultProductComponent} from './product-pages/default-product/default-product.component';
import {SharedModule} from "@app/shared/shared.module";
import {HeaderModule} from "../pages/header/header.module";
import {FooterModule} from "../pages/footer/footer.module";
import {ProductsSliderModule} from "@app/shared/products-slider/products-slider.module";
import {RateStarModule} from '@app/shared/rate-star/rate-star.module';
import {FeatureSliderModule} from "@app/shared/feature-slider/feature-slider.module";
import {SocialLinksModule} from "@app/shared/social-links/social-links.module";
import {ChartsModule} from "@app/shared/charts/charts.module";
import { QADialogComponent } from './product-pages/component/qa-dialog/qa-dialog.component';
import { CommentDialogComponent } from './product-pages/component/comment-dialog/comment-dialog.component';
import {CommentListComponent} from "@app/modules/product/product-pages/component/comment-list/comment-list.component";
import {
  QuestionListComponent
} from "@app/modules/product/product-pages/component/question-list/question-list.component";
import {CountdownModule} from "@app/shared/count-down/count-down.module";


@NgModule({
  declarations: [
    ControllerComponent,
    DefaultProductComponent,
    QADialogComponent,
    CommentDialogComponent,
    CommentListComponent,
    QuestionListComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    HeaderModule,
    FooterModule,
    ProductsSliderModule,
    RateStarModule,
    FeatureSliderModule,
    SocialLinksModule,
    ChartsModule,
    CountdownModule
  ]
})
export class ProductModule {
}
