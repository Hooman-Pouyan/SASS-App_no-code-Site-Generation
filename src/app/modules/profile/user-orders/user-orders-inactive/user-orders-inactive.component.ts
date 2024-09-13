import {Component, OnInit} from '@angular/core';
import {OrderModel, OrderStatus, UserOrderStatus} from "@app/core/models/order.model";
import {OrderService} from "@app/core/services/order.service";
import {ModulesService} from "@app/core/services/modules.service";
import {MatDialog} from "@angular/material/dialog";
import {OrderCommentComponent} from "@app/modules/profile/user-orders/components/order-comment/order-comment.component";

@Component({
  selector: 'user-orders-inactive',
  templateUrl: './user-orders-inactive.component.html',
  styleUrls: ['./user-orders-inactive.component.scss']
})
export class UserOrdersInactiveComponent implements OnInit {

  inactiveOrder: OrderModel[] = []

  constructor(
    private ordersService: OrderService,
    public modulesService: ModulesService,
    private matDialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders(): void {
    this.ordersService.getOrderDetail(UserOrderStatus.inactive).subscribe((orders: OrderModel[]) => {
      this.inactiveOrder = orders
    })
  }

  commentOnOrder(orderID: number): void {
    this.matDialog.open(OrderCommentComponent, {
      width: '450px',
      maxWidth: '100%',
      data: orderID
    }).afterClosed().subscribe(res => {
      if (res) {
        this.getOrders()
      }
    })
  }

}
