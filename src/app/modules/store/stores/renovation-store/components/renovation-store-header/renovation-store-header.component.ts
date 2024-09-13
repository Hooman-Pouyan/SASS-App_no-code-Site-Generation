import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {environment} from '@env/environment';
import {OrderService} from "@app/core/services/order.service";
import {StoreService} from "@app/core/services/store.service";
import {ActivatedRoute} from "@angular/router";
import {CredentialsService} from '@app/core/services/credentials.service';
import {CartService} from '@app/core/services/cart.service';
import {CartModel, CartProductModel} from "@app/core/models/cart.model";

@Component({
  selector: 'renovation-store-header',
  templateUrl: './renovation-store-header.component.html',
  styleUrls: ['./renovation-store-header.component.scss']
})
export class RenovationStoreHeaderComponent implements OnInit, OnChanges {

  @Input() change: boolean
  @Output() complete: EventEmitter<boolean> = new EventEmitter<boolean>()
  currentTabState: 'in' | 'out' = 'in'

  adminImageUrlDevelop: string = environment.ADMIN_API_URL;
  cartProducts = {} as CartModel;
  cartCount: number = 0;
  showProducts: boolean = false;


  constructor(
    private orderService: OrderService,
    private storeService: StoreService,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    public credentialsService: CredentialsService
  ) {
  }

  ngOnInit(): void {
    this.updateCartByTabChange();
    this.onCallCart();
    this.getProductCart()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.change.firstChange && changes.change.currentValue) {
      this.getProductCart()
    }
  }

  updateCartByTabChange(): void {
    document.addEventListener("visibilitychange", () => {
      const prevState = this.currentTabState
      this.currentTabState = document.hidden ? 'out' : 'in';
      if (prevState == 'out' && this.currentTabState == 'in') {
        // this.cartService.updateLocalCart()
      }
    });
  }

  onCallCart(): void {
    // this.cartService.updateLocalCart();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

  logOut(): void {
    this.credentialsService.logout();
  }

  filterByCategory(): CartProductModel[] {
    let current_category = this.activatedRoute.snapshot.params.id
    let sample = this.cartProducts.order_products.find(f => f.product_store.product.GENEALOGY.includes(current_category))
    let parent_genealogy: number = +sample.product_store.product.GENEALOGY.split(',')[2]
    return this.cartProducts.order_products.filter(f => f.product_store.product.GENEALOGY.includes(parent_genealogy.toString()))
  }

  getProductCart() {
    this.cartService.currentCart.subscribe(cart => {
        if (cart) {
          this.cartProducts = cart;
          this.cartProducts.order_products = this.filterByCategory()
        }
      },
      () => {
      },
      () => this.complete.emit(true)
    );
  }

  deleteProduct(product: CartProductModel) {

    let orderDetailProductId: number;

    if (product.order_product_details?.length) {
      orderDetailProductId = product.order_product_details[0].ID
    }

    this.cartService.deleteProduct(product.ID, orderDetailProductId).subscribe(() => {
      // this.cartService.updateLocalCart();
    });
  }

}
