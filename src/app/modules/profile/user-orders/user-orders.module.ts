import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserOrdersRoutingModule} from './user-orders-routing.module';
import {UserOrdersComponent} from './user-orders.component';
import {SharedModule} from "@app/shared/shared.module";
import {UserOrdersDetailComponent} from "@app/modules/profile/user-orders/user-orders-detail/user-orders-detail.component";
import {UserOrdersActiveComponent} from './user-orders-active/user-orders-active.component';
import {UserOrdersInactiveComponent} from './user-orders-inactive/user-orders-inactive.component';
import {PaymentDialogModule} from "@app/shared/payment-dialog/payment-dialog.module";
import { OrderCommentComponent } from './components/order-comment/order-comment.component';
import {RateStarModule} from "@app/shared/rate-star/rate-star.module";


@NgModule({
  declarations: [
    UserOrdersComponent,
    UserOrdersDetailComponent,
    UserOrdersActiveComponent,
    UserOrdersInactiveComponent,
    OrderCommentComponent
  ],
    imports: [
        CommonModule,
        UserOrdersRoutingModule,
        SharedModule,
        PaymentDialogModule,
        RateStarModule
    ]
})
export class UserOrdersModule {
}
