import {Component, OnDestroy, OnInit} from '@angular/core';
import {FactorService} from "@app/core/services/factor.service";
import {NavigationEnd, Router} from "@angular/router";
import {ModulesService} from "@app/core/services/modules.service";
import {CartService} from "@app/core/services/cart.service";
import {CartModel} from "@app/core/models/cart.model";
import {NotificationService} from "@app/core/services/notification.service";
import {OrderType} from "@app/core/models/factor.model";
import * as moment from "jalali-moment";
import {PaymentDialogComponent} from "@app/shared/payment-dialog/payment-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {checkProductStatus} from "@app/core/models/product.model";
import {Subscription} from "rxjs";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'factor-invoice',
  templateUrl: './factor-invoice.component.html',
  styleUrls: ['./factor-invoice.component.scss']
})
export class FactorInvoiceComponent implements OnInit, OnDestroy {

  factorStep: 'cart' | 'setting' = 'setting';
  sourceCart = {} as CartModel;
  subscription: Subscription;

  constructor(
    public factorService: FactorService,
    private router: Router,
    private cartService: CartService,
    public modulesService: ModulesService,
    private notificationService: NotificationService,
    private dialog: MatDialog,
    public storeSettingService: StoreSettingService
  ) {
    this.setFactorStep();
  }

  ngOnInit(): void {
    this.getProductsSum();
    this.autoApply()
    //factorService
  }

  shwo(event){
    console.log((event))
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  autoApply(): void {
    this.factorService.checkIdentifierCode().subscribe(res => {
      if (res?.IS_INTRODUCE_V2 == 0) {
        this.factorService.introducedOffer = res.INTRODUCE > 0 ? res.INTRODUCE : 0;
        this.factorService.giftOffer = 0;
      } else {
        this.factorService.introducedOffer = 0;
        this.factorService.giftOffer = res.INTRODUCE > 0 ? res.INTRODUCE : 0;
      }
      this.factorService.firstOrderOffer = res?.FIRST_ORDER > 0 ? res.FIRST_ORDER : 0;
      this.factorService.updateOrderAndCourierValue();
      this.factorService.updateOrderAndCourierType();
    })
  }

  getProductsSum(): void {
    // this.cartService.updateLocalCart();
    this.subscription = this.cartService.currentCart.subscribe((cart: CartModel) => {
      if (cart) {
        this.sourceCart = cart
      }
      this.factorService.orderProductsPrice = cart.PRODUCTS_SUM;
      this.factorService.updateOrderAndCourierValue();
    })
  }

  setFactorStep(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('factor/setting')) {
          this.factorStep = 'setting'
        } else if (!event.url.includes('factor')) {
          this.factorService.discountCode = null;
          this.factorService.discountCodeOffer = 0;
        } else {
          this.factorStep = 'cart'
        }
      }
    })
  }

  discountVerify(): void {
    this.factorService.checkOfferCode(this.factorService.discountCode).subscribe(
      res => {
        if (res && res.OFFERVALUE) {
          this.factorService.discountCodeVerified = true;
          this.factorService.discountCodeOffer = res.OFFERVALUE;
          this.notificationService.valid('کد تخفیف با موفقعیت اعمال شد')
        } else {
          this.factorService.discountCodeVerified = false
        }
      },
      () => {
        this.factorService.discountCodeVerified = false
      }
    )
  }

  checkHasUnAvailable(): boolean {
    let _hasUnAvailable: boolean = false
    this.sourceCart?.order_products?.forEach(product => {
      _hasUnAvailable = !checkProductStatus(product.product_store?.product?.PRODUCT_STATUS_ID)
    })
    return _hasUnAvailable
  }

  checkMinimumCart(): boolean {
    let count: number = 0;
    this.sourceCart?.order_products?.forEach(each => count += each.COUNT)
    return this.modulesService.minimumOrderProduct && count < this.storeSettingService.store.minToBuy;
  }

  routeToFactorSetting(): void {
    if (this.checkMinimumCart() == true) {
      this.notificationService.error(
        `برای ادامه سفارش حداقل تعداد خرید
       ${this.storeSettingService.store.minToBuy}
       عدد می باشد.`
      )
      return
    }

    if (this.checkHasUnAvailable() == true) {
      this.notificationService.error('سفارش شما دارای محصول ناموجود است')
      return
    }

    this.router.navigate(['/factor/setting'])
  }

  submitOrder(): void {

    if (!this.factorService.currentOrder.addressID) {
      this.notificationService.error('لطفا آدرس مقصد را انتخاب کنید')
    } else if (!this.factorService.currentOrder.orderDeliveryDate && !this.modulesService.hideFactorOrderDate) {
      this.notificationService.error('لطفا زمان ارسال را انتخاب کنید')
    } else if (!this.factorService.currentOrder.customTransportID && !this.modulesService.hideFactorOrderDate && this.modulesService.customDelivery) {
      this.notificationService.error('لطفا نحوه ارسال را انتخاب کنید')
    } else {
      const data: {
        ID,
        ORDER_DELIVERY_DATE,
        ORDER_DELIVERY_TYPE_ID,
        COMMENT,
      }[] = [{
        ID: this.factorService.currentOrder.orderID,
        ORDER_DELIVERY_DATE: moment(this.factorService.currentOrder.orderDeliveryDate).locale("en.json").format("YYYY-MM-DD HH:mm:ss"),
        ORDER_DELIVERY_TYPE_ID: 1,
        COMMENT: ''
      }]

      if (this.factorService.discountCodeVerified != true) {
        this.factorService.discountCode = null
      }

      this.factorService.submitOrder(
        this.factorService.currentOrder.addressID,
        data,
        this.factorService.discountCode).subscribe(res => {
        if (res?.CODE == 200) {
          this.factorService.discountCode = null;
          this.factorService.discountCodeOffer = 0;
          if (this.factorService.currentOrder.orderType == OrderType.direct) {
            this.dialog.open(PaymentDialogComponent, {
              maxWidth: '100%',
              width: '400px'
            }).afterClosed().subscribe(() => {
              this.router.navigate(['profile/orders']).then(() => {
              })
            })
          } else {
            this.router.navigate(['profile/orders']).then(() => {
              this.notificationService.valid('سفارش شما ثبت شد، منتظر تایید ادمین سامانه باشید')
            })
          }
        }
      })
    }


  }

}
