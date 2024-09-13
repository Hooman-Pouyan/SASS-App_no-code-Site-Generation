import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {FactorService} from 'src/app/core/services/factor.service';
import {ModulesService} from 'src/app/core/services/modules.service';
import {OrderService} from 'src/app/core/services/order.service';
import {environment} from 'src/environments/environment';
import {RenovationFactorExpertDgComponent} from './renovation-factor-expert-dg/renovation-factor-expert-dg.component';
import {UploadImageDgComponent} from './upload-image-dg/upload-image-dg.component';
import * as moment from "jalali-moment";
import {Router} from "@angular/router";
import {Location} from '@angular/common';
import {UserService} from "../../../core/services/user.service";
import { NotificationService } from '@app/core/services/notification.service';
import { RenovationService } from '@app/core/services/renovation.service';
import { CartService } from '@app/core/services/cart.service'
import { CredentialsService } from '@app/core/services/credentials.service';

@Component({
  selector: 'renovation-factor',
  templateUrl: './renovation-factor.component.html',
  styleUrls: ['./renovation-factor.component.scss']
})
export class RenovationFactorComponent implements OnInit {
  userName: string = localStorage.getItem('NAME');
  userRoleId: number = null;
  orderId: number = null;
  orders: any = null;
  totalPrice: number = 0;
  adminUrl: string = environment.ADMIN_API_URL;
  categories: any[] = null;
  cartOrders: any[] = null;
  products: any[] = [];
  productsGroupBy: any[] = null;
  ordersProductsCategory: any[] = null;
  orderProducts: any[] = null;
  expertStatus: string = '';
  storeId: string = localStorage.getItem('storeId');
  submittedSizes: {
    KEY: string,
    VALUE: string,
    NAME: string
  }[] = []


  width: number = null
  depth: number = null
  height: number = null
  prev_count: number = null
  product_categoryName: string = ""



  constructor(
    private dialog: MatDialog,
    private _location: Location,
    private factorService: FactorService,
    private orderService: OrderService,
    private router: Router,
    public modulesService: ModulesService,
    private usersService: UserService,
    private notificationService : NotificationService,
    private renovationService : RenovationService,
    private cartservice : CartService,
    private credentialsService : CredentialsService
  ) {
  }

  ngOnInit(): void {
    this.usersService.getUserCategoryInfo().subscribe(res => {
      this.submittedSizes = res
      this.getData();
    })
  }

  openExpertDialog() {
    if (!this.expertStatus.length) {
      this.notificationService.error("Do you need an expert to check and measure the required items?(Select it)");
      return;
    }
    this.dialog.open(RenovationFactorExpertDgComponent, {
      width: '800px',
      data: this.expertStatus
    }).afterClosed().subscribe(
      res => {
        if (res == true) {
          this.customerAccept()
        }
      }
    );
  }

  customerAccept() {
    let currentTime = +localStorage.getItem('serverTimeVal');
    currentTime = currentTime + (60 * 60 * 1000 * 24 * 30);
    moment.locale('en');
    const nextMonthTime = moment(currentTime).format('YYYY-MM-DD hh:mm:ss');
    this.renovationService.renovationCustomerAccept(this.orders).subscribe(() => {
      this.router.navigate(["profile/user-orders"]);
    })
  }

  changeCount(count, productId) {
    this.cartservice.editProductInCart(productId , count, '').subscribe(() => {
      this.getData();
    })
  }

  logOut() {
    this.credentialsService.logout();
  }

  checkLogin(): boolean {
    return !localStorage.getItem('TOKEN');
  }

  backClicked() {
    this._location.back();
  }

  openDialogUploadImage(item: any, orderId: number, userRoleId: number) {
    const _data = {
      product: item,
      orderId: orderId,
      userRoleId: userRoleId
    }
    this.dialog.open(UploadImageDgComponent, {
      width: '800px',
      data: _data
    });
  }

  getData() {
    this.cartservice.getCart().subscribe(res => {
      if (res && res.length > 0) {
        this.orders = res;
        const [order] = res;
        this.orderId = order.ID;
        this.userRoleId = order.CUSTOMER_ID;
        this.setDataForSlider(res);
        this.totalPrice = 0
        for (const item of res) {
          this.totalPrice += item.ORDER_VALUE_WITHOUT_COURIER;
        }
      }
    })
  }

  groupByProducts(xs) {
    return xs.reduce(function (rv, x) {
      (rv[x.product_store.product.PRODUCT_CATEGORY] = rv[x.product_store.product.PRODUCT_CATEGORY] || []).push(x.product_store.product);
      return rv;
    }, {});
  };

  getDimension(elementOrderProducts: any){

    if (this.submittedSizes?.length && (this.width || this.depth || this.height) && this.modulesService.isRenovation) {
      const dimension =  this.submittedSizes.filter(f => f.NAME == this.product_categoryName)

      const heightVal: number =  +dimension.find(f => f.NAME == this.product_categoryName && f.KEY ==  "height" )?.VALUE
      const widthtVal: number = +dimension.find(f => f.NAME == this.product_categoryName && f.KEY ==  "width" )?.VALUE
      const lengthVal: number =  +dimension.find(f => f.NAME == this.product_categoryName && f.KEY ==  "length" )?.VALUE

      elementOrderProducts.product_store.product.product_prop.COUNT = Math.floor( (widthtVal * lengthVal) / (this.width * this.depth));
      if (elementOrderProducts.product_store.product.product_prop.COUNT != this.prev_count) {
        this.changeCount(
          elementOrderProducts.product_store.product.product_prop.COUNT,
          elementOrderProducts.product_store.product.product_prop.orderProductsId
        )
      }
    }
  }

  setDataForSlider(data: any) {
    data.forEach(elementOrder => {
      elementOrder.order_products.forEach(elementOrderProducts => {
        const product_prop = {
          COUNT: elementOrderProducts.COUNT,
          orderProductsId: elementOrderProducts.ID,
          PRICE: elementOrderProducts.PRICE,
          PRICE_AFTER_OFFER: elementOrderProducts.PRICE_AFTER_OFFER,
          OFFER_VALUE: elementOrderProducts.OFFER_VALUE,
          product_store: {
            productStoreId: elementOrderProducts.product_store.ID,
            STORE_ID: elementOrderProducts.product_store.STORE_ID,
          }
        }

        this.width = +elementOrderProducts.product_store.product.productAdditional?.WIDTH
        this.depth = +elementOrderProducts.product_store.product.productAdditional?.DEPTH
        this.height  = +elementOrderProducts.product_store.product.productAdditional?.HEIGHT
        this.prev_count = +elementOrderProducts.COUNT
        this.product_categoryName = elementOrderProducts.product_store.product.store_category.NAME
    
        elementOrderProducts.product_store.product = {...elementOrderProducts.product_store.product, product_prop}
        this.getDimension(elementOrderProducts)
      });
    });

    this.productsGroupBy = this.groupByProducts(data[0].order_products);
    this.products = [];

    for (const key in this.productsGroupBy) {
      if (!this.productsGroupBy.hasOwnProperty(key)) continue;

      for (const item of this.productsGroupBy[key]) {
        item.GENEALOGY = item.GENEALOGY.split(",")[2];
        item.GENEALOGY_NAME = item.GENEALOGY_NAME.split(",")[2]
      }
      this.products.push(this.productsGroupBy[key]);
    }

  }

}

