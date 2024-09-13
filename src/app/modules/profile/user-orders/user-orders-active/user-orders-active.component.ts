import {Component, OnInit} from '@angular/core';
import {OrderModel, OrderStatus, UserOrderStatus} from "@app/core/models/order.model";
import {OrderService} from "@app/core/services/order.service";
import {ModulesService} from "@app/core/services/modules.service";
import {FactorService} from "@app/core/services/factor.service";
import {MatDialog} from "@angular/material/dialog";
import {PaymentDialogComponent} from "@app/shared/payment-dialog/payment-dialog.component";
import { NotificationService } from '@app/core/services/notification.service';

@Component({
  selector: 'user-orders-active',
  templateUrl: './user-orders-active.component.html',
  styleUrls: ['./user-orders-active.component.scss']
})
export class UserOrdersActiveComponent implements OnInit {

  activeOrder: OrderModel[] = []
  OrderStatus = OrderStatus
  payed: boolean = true;

  constructor(
    private ordersService: OrderService,
    private dialog: MatDialog,
    private factorService: FactorService,
    public modulesService: ModulesService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(): void {
    this.ordersService.getOrderDetail(UserOrderStatus.active).subscribe((orders: OrderModel[]) => {
      this.activeOrder = orders
    })
  }

  pay(order: OrderModel): void {
    this.factorService.orderID = order.ORDER_ID;
    this.factorService.orderInvoicePrice = order.ORDER_VALUE_WITH_COURIER;
    this.dialog.open(PaymentDialogComponent, {
      maxWidth: '100%',
      width: '400px'
    }).afterClosed().subscribe(() => this.getOrders())

  }

  deleteOrder(ID):void {
    this.ordersService.deleteOrderForCustomer(ID).subscribe(() => {
      this.notificationService.valid('با موفقعیت حذف شد')
      this.getOrders()
    })
  }


}
