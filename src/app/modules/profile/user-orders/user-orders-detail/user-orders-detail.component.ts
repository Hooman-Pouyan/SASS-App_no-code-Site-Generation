import {Component, OnInit} from "@angular/core";
import {OrderService} from "src/app/core/services/order.service";
import {ModulesService} from "@app/core/services/modules.service";
import {OrderDetailModel, OrderStatus, UserOrderStatus} from "@app/core/models/order.model";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "@app/core/services/notification.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: "user-orders-detail",
  templateUrl: "./user-orders-detail.component.html",
  styleUrls: ["./user-orders-detail.component.scss"]
})
export class UserOrdersDetailComponent implements OnInit {


  orderProducts: OrderDetailModel[] = [];
  orderDetail = {} as OrderDetailModel;
  displayedColumns: string[] = ['number', 'name', 'count', 'unit', 'color', 'size', 'fee', 'discount', 'total_price'];
  OrderStatus = OrderStatus;

  constructor(
    private orderService: OrderService,
    private activatedRoute: ActivatedRoute,
    public modulesService: ModulesService,
    private router: Router,
    private notificationService: NotificationService,
    public storeSettingService: StoreSettingService
  ) {
  }

  ngOnInit() {
    this.getOrderDetail();
  }

  getOrderDetail() {
    this.activatedRoute.params.subscribe(params => {
      this.orderService.getOrderDetail(UserOrderStatus.detail, +params['id']).subscribe((order: OrderDetailModel[]) => {
        if (order?.length) {
          this.orderProducts = order;
          this.orderDetail = order[0];
        }
      });
    })
  }

  deleteSeveralProduct(): void {
    let deletedProducts: { ID: number }[] = this.orderProducts.filter(f => f.DELETED_DETAIL || f.ORDER_PRODUCT_DELETED)
      .map(each => {
        return {
          ID: each.CRAT_ID
        }
      })

    this.orderService.deleteSeveralProduct({
      delete: deletedProducts,
      orderID: this.orderDetail.ORDER_ID
    }).subscribe(() => {
      this.notificationService.valid('سفارش شما تایید شد، منتظر تایید ادمین باشید')
      this.router.navigate(['../'])
    })
  }

  deleteOrder(ID): void {
    this.orderService.deleteOrderForCustomer(ID).subscribe(() => {
      this.notificationService.valid('سفارش شما حذف شد')
      this.router.navigate(['../'])
    })
  }

  get totalPriceAfterCourier(): number {
    let _price: number = 0;
    for (let product of this.orderProducts) {
      _price += this.totalProductPrice(product);
    }
    return _price + this.orderDetail.CORIER_VALUE
  }

  afterGuaranteePrice(product: OrderDetailModel, count: number = 1): number {
    if (product.ORDER_PRODUCT_DETAIL_HAS_GUARANTEE == 1 || product.ORDER_PRODUCT_HAS_GUARANTEE == 1) {
      return (this.storeSettingService.store.guaranteePrice + product.PRICE) * count
    }
    return product.PRICE * count
  }

  totalProductPrice(product: OrderDetailModel): number {
    return this.afterGuaranteePrice(product, product.COUNT_DETAIL || product.PRODUCT_COUNT)
  }

}
