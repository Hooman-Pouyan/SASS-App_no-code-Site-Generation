import {Component, OnInit} from '@angular/core';
import {FavouriteService} from 'src/app/core/services/favourite.service';
import {environment} from 'src/environments/environment';
import {calculateDiscount} from "@app/modules/global/functions";
import {CartService} from '@app/core/services/cart.service';
import {NotificationService} from "@app/core/services/notification.service";
import {ModulesService} from "@app/core/services/modules.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ProductFavoriteModel} from "@app/core/models/product.model";

@Component({
  selector: 'mk-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {

  calculateDiscount = (price: number, priceAfterOffer: number) => calculateDiscount(price, priceAfterOffer)

  constructor(
    private favouriteService: FavouriteService,
    private cartService: CartService,
    private notificationService: NotificationService,
    public modulesService: ModulesService,
    public storeSettingService: StoreSettingService,
  ) {
  }

  favouriteProducts: ProductFavoriteModel[] = [];
  imageUrl: string = environment.ADMIN_API_URL;

  ngOnInit() {
    this.getFavourite();
  }

  getFavourite() {
    this.favouriteService.getFavourite().subscribe(
      (res: ProductFavoriteModel[]) => {
        this.favouriteProducts = res.map((m: any) => {
          m = {...m, ...m.product}
          m.product = undefined
          this.setGenealogy(m);
          m.IS_FAVORIT = true
          m.PRICE = m.product_stores[0].product_store_prices[0].PRICE;
          m.PRICE_AFTER_OFFER = m.product_stores[0].product_store_prices[0].PRICE_AFTER_OFFER;
          return m
        });
      }
    )
  }

  setGenealogy(product: ProductFavoriteModel): void {
    let genealogy: string[] = product.GENEALOGY.split(',').filter(f => f)
    genealogy.pop();
    genealogy.shift();

    let genealogy_name: string[] = product.GENEALOGY_NAME.split(',').filter(f => f)
    genealogy_name.pop();
    genealogy_name.shift();

    product.category_genealogy = []
    for (let i = 0; i < genealogy.length; i++) {
      product.category_genealogy.push({
        ID: +genealogy[i],
        NAME: genealogy_name[i]
      })
    }
  }

  addToCart(product: ProductFavoriteModel) {
    let count = product.product_unit.NAME_EN == "kilogram" ? 0.5 : 1
    this.cartService.addToCart(product.PRODUCT_STORE_ID, count, ' ').subscribe(() => {
      this.notificationService.valid('با موفقیت به سبد خرید اضافه شد')
      // this.cartService.updateLocalCart()
    })
  }

  toggleFavorite(product: ProductFavoriteModel) {
    if (product.IS_FAVORIT) {
      this.favouriteService.deleteFavourite(product.PRODUCT_STORE_ID).subscribe(
        () => product.IS_FAVORIT = false
      )
    } else {
      this.favouriteService.addFavourite(product.PRODUCT_STORE_ID).subscribe(
        () => product.IS_FAVORIT = true
      )
    }
  }
}
