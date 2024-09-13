import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import { LandingService } from "@app/core/services/landing.service";
import { StoreSettingService } from "@app/core/services/store-setting.service";
import { CredentialsService } from "@app/core/services/credentials.service";
import { environment } from "@env/environment";
import { SidenavStatus } from "@app/core/models/cart.model";
import SwiperCore, { Autoplay, Navigation, Pagination, SwiperOptions } from 'swiper';
import { CartService } from "@app/core/services/cart.service";
import { ModulesService } from "@app/core/services/modules.service";
import {
  ProductSliderModel,
  ProductSliderType,
  ProductsFilter,
  ProductUnitStatus,
  ProductStatus,
  checkProductStatus,
} from "@app/core/models/product.model";
import { ProductService } from "@app/core/services/product.service";
import { LandingAttributeModel } from "@app/core/models/landing.model";
import { DragDropService } from "@app/core/services/drag-drop.service";
import { FactorService } from "@app/core/services/factor.service";
import { BannerType } from "@app/core/models/store.model";
import { CategoryModel } from '@app/core/models/category.model';
import { CategoryService } from '@app/core/services/category.service';
import { NotificationService } from '@app/core/services/notification.service';
import { FavouriteService } from '@app/core/services/favourite.service';
import { calculateDiscount } from "@app/modules/global/functions";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {jarallax} from "jarallax";
import * as $ from "jquery";

@Component({
  selector: 'base-theme8',
  templateUrl: './base-theme8.component.html',
  styleUrls: ['./base-theme8.component.scss']
})
export class BaseTheme8Component implements OnInit, AfterViewInit {

  imageUrl: string = environment.ADMIN_API_URL;
  blogs: GeneralAttributeModel[] = []
  searchIcon: boolean = false;
  isFavourite: boolean = false;
  categories: CategoryModel[] = [];
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
    navigation: true
  };
  productsSummary: {
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
    link?: string,
    query?: { [key: string]: string }
  } = {
      name: 'پربازدید ترین ها',
      type: ProductSliderType.mostVisited,
      link: `/store/category/1`,
      query: { 'sort': ProductsFilter.mostSell.toString() }
    };
  sidenavStatus = SidenavStatus;
  cartCount: number = 0;
  calculateDiscount = (price: number, priceAfterOffer: number) => calculateDiscount(price, priceAfterOffer)
  checkProductStatus = (status: ProductStatus) => checkProductStatus(status)


  constructor(
    private landingService: LandingService,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public modulesService: ModulesService,
    private factorService: FactorService,
    private productService: ProductService,
    private categoryService: CategoryService,
    public cartService: CartService,
    private notificationService: NotificationService,
    private favouriteService: FavouriteService,
    public dynamicMediaService: DynamicMediaService,
    public dragDropService: DragDropService
  ) {
  }

  ngOnInit(): void {
    this.getProductsSlider(this.productsSummary);
    this.getCategoryList();
    this.onCallCartNotebook();
    this.getBlogs();
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

  getBlogs(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.blog).subscribe(res => {
      this.blogs = res.map(m => {
        m.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + m.FILES
        return m
      })
    })
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

  getProductsSlider(sliderType: {
    type: ProductSliderType,
    products?: ProductSliderModel[]
  }): void {
    this.productService.getProductLimitedSummary(sliderType.type, 6).subscribe(products => {
      sliderType.products = products
    })
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories
      this.categories.forEach(category => {
        this.getProductsByCategory(category)
      })
    })
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

  favourite(storeId) {
    if (this.isFavourite) {
      this.favouriteService.deleteFavourite(storeId).subscribe(
        () => this.isFavourite = false
      )
    } else {
      this.favouriteService.addFavourite(storeId).subscribe(
        () => this.isFavourite = true
      )
    }
  }

}
