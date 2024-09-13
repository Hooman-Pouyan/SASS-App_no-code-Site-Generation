import {Component, OnInit} from '@angular/core';
import {environment} from "@env/environment";
import {CartService} from "@app/core/services/cart.service";
import {CartModel, CartProductModel} from "@app/core/models/cart.model";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {checkProductStatus, ProductStatus, ProductStatusName, ProductUnitStatus} from "@app/core/models/product.model";
import {NotificationService} from "@app/core/services/notification.service";

@Component({
  selector: 'notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.scss']
})
export class NotebookComponent implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;
  sourceNotebook = {} as CartModel;
  productStatusName = (status: ProductStatus) => ProductStatusName(status)
  checkProductStatus = (status: ProductStatus) => checkProductStatus(status)
  currentTabState: 'in' | 'out' = 'in';

  constructor(
    public cartService: CartService,
    public storeSettingService: StoreSettingService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getProductNotebook();
  }

  getProductNotebook() {
    // this.cartService.updateLocalNotebook();
    this.cartService.currentNoteBook.subscribe(notebook => {
      if (notebook) {
        this.sourceNotebook = notebook
      }
    });
  }

  editProductInCart(product: CartProductModel) {
    let detailID: number = product.order_product_details.length ? product.order_product_details[0]?.ID : undefined

    this.cartService.editProductInCart(product.ID, product.COUNT, product.DESCRIPTION || "", detailID).subscribe(
      () => {
        // this.cartService.updateLocalNotebook()
      }
    )
  }

  addNotebook(product: CartProductModel) {
    if (product.product_store.product.PRODUCT_UNIT_ID === ProductUnitStatus.kilogram) {
      product.COUNT += .5;
    } else {
      product.COUNT += 1;
    }

    this.editProductInCart(product)
  }

  subNotebook(product: CartProductModel) {

    if (product.product_store.product.PRODUCT_UNIT_ID === ProductUnitStatus.kilogram) {
      product.COUNT -= .5;
    } else {
      product.COUNT -= 1;
    }

    if (product.COUNT <= 0) {
      this.deleteNotebookProduct(product)
    } else {
      this.editProductInCart(product)
    }
  }

  deleteNotebookProduct(product: CartProductModel) {
    this.cartService.deleteProduct(product.ID).subscribe(
      () => {
        this.notificationService.valid('محصول با موفقیت حذف شد')
        // this.cartService.updateLocalNotebook()
      }
    );
  }

  deleteNotebook() {
    this.cartService.deleteNotebook().subscribe(() => {
      // this.cartService.updateLocalNotebook()
      this.sourceNotebook = {} as CartModel
    })
  }

  addNoteBookToCart(product: CartProductModel) {
    let detailID1: number = product.order_product_details.length ? product.order_product_details[0]?.FEATURE_ID_1 : undefined
    let detailID2: number = product.order_product_details.length ? product.order_product_details[0]?.FEATURE_ID_2 : undefined

    this.cartService.addToCart(product.product_store.ID, product.COUNT, product.DESCRIPTION, detailID1, detailID2).subscribe(() => {
      this.notificationService.valid('با موفقیت به سبد خرید اضافه شد')
      // this.cartService.updateLocalNotebook();
      // this.cartService.updateLocalCart();
    });
  }

}
