import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {
  checkProductStatus,
  ProductSliderModel,
  ProductStatus,
  ProductStatusName,
  ProductUnitStatus
} from "@app/core/models/product.model";
import {environment} from "@env/environment";
import {calculateDiscount} from "@app/modules/global/functions";
import {CartService} from "@app/core/services/cart.service";
import {NotificationService} from "@app/core/services/notification.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CallToBuyComponent} from "@app/shared/call-to-buy/call-to-buy.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'product-slide',
  templateUrl: './product-slide.component.html',
  styleUrls: ['./product-slide.component.scss']
})
export class ProductSlideComponent implements OnInit {

  @Input() product: ProductSliderModel;
  @Input() hasBorder: boolean = true;
  @Input() fixWidth: boolean = false;
  @Input() theme: 'light' | 'dark' | 'alternative' = "light";


  imageUrl: string = environment.ADMIN_API_URL;
  imgProductLoaded: boolean = false;
  productStatus = ProductStatus;
  calculateDiscount = (price: number, priceAfterOffer: number) => calculateDiscount(price, priceAfterOffer)
  productStatusName = (status: ProductStatus) => ProductStatusName(status)
  checkProductStatus = (status: ProductStatus) => checkProductStatus(status)

  constructor(
    private cartService: CartService,
    private notificationService: NotificationService,
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  addToCart(product: ProductSliderModel) {
    const count: number = product.PRODUCT_UNIT_ID == ProductUnitStatus.kilogram ? 0.5 : 1
    this.cartService.addToCart(product.PRODUCT_STORE_ID, count, '').subscribe(() => {
      if (product.HAS_GUARANTEE == 1) {
        this.notificationService.warning('امکان خرید این محصول همراه گارانتی فراهم می باشد', '', 4000)
      } else {
        this.notificationService.valid('با موفقیت به سبد خرید اضافه شد')
      }
      // this.cartService.updateLocalCart()
    })
  }


  callToBuyDialog(): void {
    this.dialog.open(CallToBuyComponent, {
      width: '450px',
      maxWidth: '100%'
    })
  }

}
