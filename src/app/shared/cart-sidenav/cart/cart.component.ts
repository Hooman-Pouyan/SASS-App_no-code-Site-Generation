import {Component, OnInit} from '@angular/core';
import {environment} from "@env/environment";
import {CartService} from "@app/core/services/cart.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CartModel, CartProductModel, checkProductAvailability, SidenavStatus} from "@app/core/models/cart.model";
import {checkProductStatus, ProductStatus, ProductUnitStatus} from "@app/core/models/product.model";
import {ModulesService} from "@app/core/services/modules.service";
import {NotificationService} from "@app/core/services/notification.service";
import {Router} from "@angular/router";
import {_window} from "@app/modules/global/global-variable";


@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;
  sourceCart = {} as CartModel;
  CartSidenavStatus = SidenavStatus;
  currentTabState: 'in' | 'out' = 'in';
  windowWidth: number = _window.innerWidth;
  checkProductStatus = (status: ProductStatus) => checkProductStatus(status)

  constructor(
    public cartService: CartService,
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    private notificationService: NotificationService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    // this.cartService.updateLocalCart()
    this.cartService.currentCart.subscribe(cart => {
      if (cart) {
        this.sourceCart = cart
        if (this.modulesService.productInputCounter) {
          this.setLocalCount();
        }
      }
    });
  }

  setLocalCount(): void {
    this.sourceCart?.order_products?.forEach(each => each.LOCAL_COUNT = each.COUNT)
  }

  deleteProduct(product: CartProductModel) {
    let orderDetailProductId: number;

    if (product.order_product_details?.length) {
      orderDetailProductId = product.order_product_details[0].ID
    }

    this.cartService.deleteProduct(product.ID, orderDetailProductId).subscribe(() => {
      this.notificationService.valid('محصول با موفقیت حذف شد')
      // this.cartService.updateLocalCart();
    });
  }

  editProductInCart(product: CartProductModel, changeCounter?: boolean) {
    let detailID: number = product.order_product_details.length ? product.order_product_details[0]?.ID : undefined;

    let hasGuarantee: boolean = false;
    if (product.order_product_details.length && product.order_product_details[0].HAS_GUARANTEE == 1) {
      hasGuarantee = true;
    } else if (product.HAS_GUARANTEE == 1) {
      hasGuarantee = true;
    }

    this.cartService.editProductInCart(
      product.ID,
      changeCounter == true ? product.LOCAL_COUNT : product.COUNT,
      product.DESCRIPTION || "",
      detailID,
      hasGuarantee
    ).subscribe(
      () => {
        this.notificationService.valid('با موفقیت ثبت شد')
        // this.cartService.updateLocalCart();
      }
    )
  }

  addToCart(product: CartProductModel) {
    if (product.product_store.product.PRODUCT_UNIT_ID === ProductUnitStatus.kilogram) {
      product.COUNT += .5;
    } else {
      product.COUNT += 1;
    }
    this.editProductInCart(product)
  }

  subFromCart(product: CartProductModel) {

    if (product.product_store.product.PRODUCT_UNIT_ID === ProductUnitStatus.kilogram) {
      product.COUNT -= .5;
    } else {
      product.COUNT -= 1;
    }

    if (product.COUNT <= 0) {
      this.deleteProduct(product)
    } else {
      this.editProductInCart(product)
    }

  }

  deleteCart() {
    this.cartService.deleteCart().subscribe(
      () => {
        this.notificationService.valid('با موفقیت حذف شد')
        // this.cartService.updateLocalCart();
        this.sourceCart = {} as CartModel
      }
    );
  }

  checkMinimumCart(): boolean {
    let count: number = 0;
    this.sourceCart.order_products.forEach(each => count += each.COUNT)
    return this.modulesService.minimumOrderProduct && count < this.storeSettingService.store.minToBuy;
  }

  routeToFactor(): void {
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

    if (this.checkLessAvailable() == true) {
      this.notificationService.error('سفارش شما دارای محصولی با عدم موجودی کافی است')
      return
    }

    this.cartService.cartSidenav = SidenavStatus.close
    this.router.navigate(['/factor']).then(() => {
    })
  }

  checkHasGuarantee(product: CartProductModel): boolean {
    if (product.order_product_details.length) {
      return product.order_product_details[0].HAS_GUARANTEE == 1
    } else {
      return product.HAS_GUARANTEE == 1;
    }
  }

  checkHasUnAvailable(): boolean {
    let _hasUnAvailable: boolean = false
    this.sourceCart?.order_products?.forEach(product => {
      _hasUnAvailable = !checkProductStatus(product.product_store?.product?.PRODUCT_STATUS_ID)
    })
    return _hasUnAvailable
  }

  checkLessAvailable(product?: CartProductModel): boolean {

    if (product) {
      return !checkProductAvailability(product)
    }

    if (this.sourceCart?.order_products?.length) {
      for (let eachProduct of this.sourceCart.order_products) {
        if (!checkProductAvailability(eachProduct) == true) {
          return true
        }
      }
    }

    return false
  }

  checkCart():boolean{
    // this.sourceCart.order_products.forEach(product =>{
    //   if(product.COUNT < product.product_store[0].PRODUCT_LIMITATION ){
    //     return true
    //   }
    // })
    // if(product.COUNT < product.product_store.PRODUCT_LIMITATION )

    if(this.sourceCart?.order_products?.length < 1 ){
      return true
    }
    return false
  }

}
