import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { DynamicMediaService } from "@app/core/services/dynamic-media.service";
import { jarallax } from "jarallax";
import SwiperCore, { Navigation, Pagination, SwiperOptions } from "swiper";
import { DragDropService } from "@app/core/services/drag-drop.service";
import { StoreSettingService } from "@app/core/services/store-setting.service";
import { Autoplay } from "swiper/core";
import { SwiperComponent } from "swiper/angular";
import { ModulesService } from '@app/core/services/modules.service';
import { CredentialsService } from '@app/core/services/credentials.service';
import { CartService } from '@app/core/services/cart.service';
import { AppService } from '@app/core/services/app.service';
import { CategoryService } from '@app/core/services/category.service';
import { CategoryModel } from '@app/core/models/category.model';
import { environment } from '@env/environment';
import { LandingService } from '@app/core/services/landing.service';
import { GeneralAttributeModel, GeneralAttributeType } from "@app/core/models/general-attribute.model";
import {SocialMediaContact, SocialType} from "@app/core/models/store.model";
import {_window} from "@app/modules/global/global-variable";
import {SearchDialogComponent} from '@app/shared/search-dialog/search-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { adjustColor } from '@app/modules/global/functions';
import { ProductService } from '@app/core/services/product.service';
import {
  ProductSliderModel,
  ProductSliderType,
  ProductStatus,
  checkProductStatus,
  ProductUnitStatus
} from "@app/core/models/product.model";
import {NotificationService} from "@app/core/services/notification.service";


SwiperCore.use([
  Pagination,
  Autoplay,
  Navigation
]);

@Component({
  selector: 'base-theme22',
  templateUrl: './base-theme22.component.html',
  styleUrls: ['./base-theme22.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme22Component implements OnInit {

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @ViewChild('productSwiper', { static: false }) productSwiper?: SwiperComponent;
  adjustColor = (amount: number, color: string = this.modulesService.primaryColor) => adjustColor(color, amount);
  checkProductStatus = (status: ProductStatus) => checkProductStatus(status);
  ScrollFlag: boolean = true;
  imageUrl: string = environment.ADMIN_API_URL;
  products: ProductSliderModel[] = []
  features: GeneralAttributeModel[]  =[]
  categories: CategoryModel[] = [];
  selectedCategory: CategoryModel;
  mainSliderConfig: SwiperOptions = {
    loop: true,
    centeredSlides: false,
    navigation: false,
    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      1024: {
        slidesPerView: 1
      },
      500: {
        slidesPerView: 2
      },
      450: {
        slidesPerView: 1.5
      },
      425: {
        slidesPerView: 1
      },
      225: {
        slidesPerView: 1
      },
    },

  };
  productSliderConfig :  SwiperOptions = {
    direction: 'horizontal',
    allowTouchMove: true,
    slidesPerView: 4,
    spaceBetween:0.5,
    loop: true,

    autoplay: {
      delay: 2000,
    },
    breakpoints: {
      1024: {
        slidesPerView: 4
      },
      500: {
        slidesPerView: 4
      },
      450: {
        slidesPerView: 3
      },
      425: {
        slidesPerView: 1
      },
      225: {
        slidesPerView: 1
      },
    },


  }

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public dragDropService: DragDropService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    private categoryService: CategoryService,
    private landingService: LandingService,
    private elementRef:ElementRef,
    public dynamicMediaService: DynamicMediaService,
    private dialog: MatDialog,
    private productService: ProductService,
    private notificationService: NotificationService,

  ) { }

  ngOnInit(): void {
    this.getMostSaleProducts();
    this.getFeatures();
    this.getCategoryList();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.ScrollFlag = this.appService.muchScrolled < 80;
  }

  getMostSaleProducts(): void {
    this.productService.getProductLimitedSummary(ProductSliderType.bestSellers, 8).subscribe(products => {
      if (typeof products == 'object') {
        this.products = products;
      }
    })
  }


  socialLink(social: SocialMediaContact): string {
    if (social.type == SocialType.whatsapp && _window.innerWidth < 959) {
      return social.link.replace('web', 'api')
    } else {
      return social.link
    }
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

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories;
      this.selectedCategory = this.categories[0];
      this.getProductsByCategory(this.selectedCategory)
    })
  }

  getProductsByCategory(category: CategoryModel) {
    this.categoryService.getProductsByCategoryId(category.PRODUCT_ID, 8).subscribe(products => {
      category.products = products?.DATA
    })
  }


  getFeatures(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.attribute).subscribe(res => {
      this.features = res.map(el => {
        el.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + el.FILES
        return el
      })
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

  searchDialog() {
    this.dialog.open(SearchDialogComponent, {
      width: '400px',
      maxWidth: '100%',
    });
  }

  slideNext() {
    this.productSwiper.swiperRef.slideNext(100);
  }

  slidePrev() {
    this.productSwiper.swiperRef.slidePrev(100);
  }

}
