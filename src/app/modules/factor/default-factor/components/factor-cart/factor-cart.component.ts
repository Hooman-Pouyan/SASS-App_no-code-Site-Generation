import {Component, OnInit} from '@angular/core';
import {CartService} from "@app/core/services/cart.service";
import {CartModel, CartProductModel} from "@app/core/models/cart.model";
import {ProductUnitStatus} from "@app/core/models/product.model";
import {environment} from "@env/environment";
import {NotificationService} from "@app/core/services/notification.service";
import {FactorService} from "@app/core/services/factor.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'factor-cart',
  templateUrl: './factor-cart.component.html',
  styleUrls: ['./factor-cart.component.scss']
})
export class FactorCartComponent implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;
  products = {} as CartModel;

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService,
    public storeSettingService: StoreSettingService
  ) {
  }

  ngOnInit(): void {
    this.cartService.updateCart();
    this.getProducts();
  }

  getProducts(): void {
    this.cartService.currentCart.subscribe(cart => {
      if (cart) {
        this.products = cart
      }
    })
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

  editProductInCart(product: CartProductModel) {

    let detailID: number = product.order_product_details.length ? product.order_product_details[0]?.ID : undefined

    let hasGuarantee: boolean = false;
    if (product.order_product_details.length && product.order_product_details[0].HAS_GUARANTEE == 1) {
      hasGuarantee = true;
    } else if (product.HAS_GUARANTEE == 1) {
      hasGuarantee = true;
    }

    this.cartService.editProductInCart(
      product.ID,
      product.COUNT,
      product.DESCRIPTION || "",
      detailID,
      hasGuarantee
    ).subscribe(
      () => {
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

  checkHasGuarantee(product: CartProductModel): boolean {
    if (product.order_product_details.length) {
      return product.order_product_details[0].HAS_GUARANTEE == 1
    } else {
      return product.HAS_GUARANTEE == 1;
    }
  }

}
