import {Injectable, Injector} from '@angular/core';
import {catchError, map, tap} from "rxjs/operators";
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {Subject, throwError} from "rxjs";
import {CartModel, SidenavStatus} from "@app/core/models/cart.model";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _currentCart: Subject<CartModel> = new Subject<CartModel>();
  private _cartCount: Subject<number> = new Subject<number>();
  private _cartSidenavStatus: Subject<SidenavStatus> = new Subject<SidenavStatus>();

  private _currentNoteBook: Subject<CartModel> = new Subject<CartModel>();
  private _noteBookCount: Subject<number> = new Subject<number>();

  constructor(
    private httpClient: HttpClient,
    private modulesService: ModulesService,
    private injector: Injector,
    private storeSettingService: StoreSettingService
  ) {
  }

  // functions

  calculateCount(cart: CartModel): number {
    let count = 0;

    cart?.order_products?.forEach(orderProduct => {
      count += orderProduct.COUNT
    })

    return count;
  }

  calculateSumPrice(cart: CartModel) {
    let sum: number = 0;

    if (cart?.order_products?.length) {
      for (const product of cart.order_products) {
        if (
          this.storeSettingService.store.guaranteePrice &&
          product.HAS_GUARANTEE == 1 && !product.order_product_details.length
        ) {
          product.PRICE_AFTER_OFFER += this.storeSettingService.store.guaranteePrice
          product.PRICE += this.storeSettingService.store.guaranteePrice
        }
        sum += (product.PRICE_AFTER_OFFER ? product.PRICE_AFTER_OFFER * product.COUNT :
          product.PRICE ? product.PRICE * product.COUNT : product.COUNT);
      }
    }

    return sum
  }

  initCart(cart: CartModel): CartModel {
    let newProducts: any[] = [];
    for (const p of cart.order_products) {
      if (p.order_product_details?.length) {
        p.order_product_details.forEach(feature => {
          let newProduct = Object.assign({}, p);
          newProduct.order_product_details = [feature]
          newProduct.COUNT = feature.COUNT
          if (this.storeSettingService.store.guaranteePrice && feature.HAS_GUARANTEE == 1) {
            newProduct.PRICE_AFTER_OFFER += this.storeSettingService.store.guaranteePrice
            newProduct.PRICE += this.storeSettingService.store.guaranteePrice
          }
          newProducts.push(newProduct)
        })
      } else {
        newProducts.push(p)
      }
    }
    cart.order_products = newProducts
    return cart
  }

  updateCart(): void {
    if (!this.injector.get(CredentialsService).isAdmin) {
      this.getCart().subscribe(cart => {
        if (cart?.length) {
          this.currentCart = this.initCart(cart[0])
        } else {
          this.currentCart = {}
        }
      })
    }
  }

  updateNotebook(): void {
    if (!this.injector.get(CredentialsService).isAdmin && this.modulesService.secondCart) {
      this.getNotebook().subscribe(notebook => {
        if (notebook?.length) {
          this.currentNoteBook = this.initCart(notebook[0])
        } else {
          this.currentNoteBook = {}
        }
      })
    }
  }

  // cart

  set currentCart(cart: CartModel | any) {
    if (cart) {
      this.cartCount = this.calculateCount(cart)
    } else {
      this.cartCount = 0
    }
    cart.PRODUCTS_SUM = this.calculateSumPrice(cart)

    this._currentCart.next(cart)
  }

  get currentCart(): Subject<CartModel> | any {
    return this._currentCart
  }

  set cartCount(count: number | any) {
    this._cartCount.next(count)
  }

  get cartCount(): Subject<number> | any {
    return this._cartCount
  }

  set cartSidenav(status: SidenavStatus | any) {
    this._cartSidenavStatus.next(status)
  }

  get cartSidenav(): Subject<SidenavStatus> | any {
    return this._cartSidenavStatus
  }

  // notebook

  set currentNoteBook(notebook: CartModel | any) {
    this._currentNoteBook.next(notebook)
    if (notebook)
      this.noteBookCount = this.calculateCount(notebook)
    else
      this.noteBookCount = 0
  }

  get currentNoteBook(): Subject<CartModel> | any {
    return this._currentNoteBook
  }

  set noteBookCount(count: number | any) {
    this._noteBookCount.next(count)
  }

  get noteBookCount(): Subject<number> | any {
    return this._noteBookCount
  }


  // http services

  // cart
  getCart() {
    return this.httpClient.get("/api/order/cart").pipe(
      map((response: any[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  addToCart(id, count, description, color_id?: number, size_id?: number, hasGuarantee?: boolean) {
    const data = {
      PRODUCT_ID: id,
      COUNT: count,
      DESCRIPTION: description,
      FEATURE_ID_IN1: color_id,
      FEATURE_ID_IN2: size_id,
      HAS_GUARANTEE: hasGuarantee ? 1 : 0
    }

    return this.httpClient.post("/api/order/cart", data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error)),
      tap(() => {
        this.updateCart()
      })
    );
  }

  deleteCart() {
    return this.httpClient.delete("/api/order/cart").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error)),
      tap(() => {
        this.updateCart()
      })
    );
  }

  // notebook
  getNotebook() {
    return this.httpClient.get("/api/order/notes").pipe(
      map((response: any[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  addToNotebook(id, count, description, color_id?: number, size_id?: number) {
    const data = {
      PRODUCT_ID: id,
      COUNT: count,
      DESCRIPTION: description,
      FEATURE_ID_IN1: color_id,
      FEATURE_ID_IN2: size_id,
      NOTE_BOOK: 1,
    }

    return this.httpClient.post("/api/order/cart", data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error)),
      tap(() => this.updateNotebook())
    );
  }

  deleteNotebook() {
    return this.httpClient.delete("/api/order/notes").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error)),
      tap(() => this.updateNotebook())
    );
  }

  // cart & notebook
  editProductInCart(id, count, description, feature_edit_id?: number, hasGuarantee?: boolean) {
    const data = {
      PRODUCT_ID: +id,
      COUNT: +count,
      DESCRIPTION: description,
      ORDER_PRODUCT_DETAIL_ID: feature_edit_id ? feature_edit_id : null,
      HAS_GUARANTEE: hasGuarantee ? 1 : 0
    }

    return this.httpClient.put("/api/order/cart", data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error)),
      tap(() => {
        this.updateCart();
        this.updateNotebook()
      })
    );
  }

  deleteProduct(productID, feature_ID?) {

    let params = new HttpParams()

    if (feature_ID) {
      params = params.set('ORDER_PRODUCT_DETAIL_ID', feature_ID.toString())
    }

    return this.httpClient.delete(`/api/order/cart/${productID}`, {params: params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error)),
      tap(() => {
        this.updateCart();
        this.updateNotebook()
      })
    );
  }

}
