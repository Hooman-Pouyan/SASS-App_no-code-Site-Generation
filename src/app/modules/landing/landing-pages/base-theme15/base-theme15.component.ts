import {AfterViewInit, Component, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {AppService} from "@app/core/services/app.service";
import {CategoryService} from "@app/core/services/category.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {ProductService} from "@app/core/services/product.service";
import {FormBuilder} from "@angular/forms";
import {TicketService} from "@app/core/services/ticket.service";
import {NotificationService} from "@app/core/services/notification.service";
import {jarallax} from "jarallax";
import * as $ from "jquery";
import {environment} from "@env/environment";
import {SidenavStatus} from "@app/core/models/cart.model";
import {CategoryModel} from "@app/core/models/category.model";
import {
  checkProductStatus,
  ProductSliderModel,
  ProductStatus,
  ProductStatusName,
  ProductUnitStatus
} from "@app/core/models/product.model";
import {calculateDiscount} from "@app/modules/global/functions";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

@Component({
  selector: 'base-theme15',
  templateUrl: './base-theme15.component.html',
  styleUrls: ['./base-theme15.component.scss']
})
export class BaseTheme15Component implements OnInit, AfterViewInit {

  sidenavStatus = SidenavStatus;
  cartCount: number = 0;
  categories: CategoryModel[] = [];
  selectedCategory = {} as CategoryModel;
  imageUrl: string = environment.ADMIN_API_URL;
  productStatus = ProductStatus;
  calculateDiscount = (price: number, priceAfterOffer: number) => calculateDiscount(price, priceAfterOffer)
  productStatusName = (status: ProductStatus) => ProductStatusName(status)
  checkProductStatus = (status: ProductStatus) => checkProductStatus(status)

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    private categoryService: CategoryService,
    public dragDropService: DragDropService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private notificationService: NotificationService,
    public dynamicMediaService: DynamicMediaService,
  ) {
  }

  ngOnInit(): void {
    this.onCallCartNotebook();
    this.getCategoryList();
  }

  ngAfterViewInit() {
    this.jarallaxInit();
  }

  jarallaxInit(): void {
    //@ts-ignore
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2
    });
    // return $.fn.jarallax to previously assigned value & give $().newJarallax the Jarallax functionality
    // @ts-ignore
    $?.fn?.newJarallax = $?.fn?.jarallax?.noConflict()
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories;
      this.selectedCategory = this.categories[0];
      this.getProductsByCategory(this.selectedCategory)
    })
  }

  categoriesToggle(categoryID: number) {
    const _category: CategoryModel = this.categories.find(f => f.PRODUCT_ID == categoryID)
    this.selectedCategory = _category;
    if (!(_category.products?.length >= 1)) {
      this.getProductsByCategory(this.selectedCategory)
    }
  }

  getProductsByCategory(category: CategoryModel) {
    this.categoryService.getProductsByCategoryId(category.PRODUCT_ID, 8).subscribe(products => {
      category.products = products?.DATA
    })
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

}
