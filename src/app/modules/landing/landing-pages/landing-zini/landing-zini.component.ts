import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";
import {LandingService} from "@app/core/services/landing.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CategoryService} from "@app/core/services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "@app/core/services/notification.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {ProductService} from "@app/core/services/product.service";
import {AppService} from "@app/core/services/app.service";
import {SwiperOptions} from "swiper";
import {ProductsFilter, ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";
import {environment} from "@env/environment";
import {calculateDiscount, isInViewportFromBottom} from "@app/modules/global/functions";
import {CategoryModel} from "@app/core/models/category.model";

@Component({
  selector: 'landing-zini',
  templateUrl: './landing-zini.component.html',
  styleUrls: ['./landing-zini.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingZiniComponent implements OnInit {

  calculateDiscount = (price: number, priceAfterOffer: number) => calculateDiscount(price, priceAfterOffer)
  shortcutLinks: {
    name: string,
    icon: string,
    link: string,
    query?: any
  }[] = [
    {
      name: 'محصولات',
      icon: 'shopping_bag',
      link: '/store/category/1'
    },
    {
      name: 'باشگاه مشتریان',
      icon: 'groups',
      link: '/profile/club'
    },
    {
      name: 'علاقه‌مندی‌ها',
      icon: 'favorite_border',
      link: '/profile/favorite'
    },
    {
      name: 'تخفیف‌های ویژه',
      icon: 'discount',
      link: '/store/category/1',
      query: {
        sort: 4,
      }
    },
    {
      name: 'تماس با ما',
      icon: 'phone',
      link: '/contact-us'
    },
  ]
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
    pagination: true
  };
  mostSellSlider: {
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
    link?: string,
    query?: { [key: string]: string }
  } = {
    name: 'پرفروش‌ترین کالاها',
    type: ProductSliderType.bestSellers,
    products: [],
    link: `/store/category/1`
  };
  mostVisitedSlider: {
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
  imageUrl: string = environment.ADMIN_API_URL;
  categories: CategoryModel[] = [];
  landingSliders: {
    title: string,
    products: ProductSliderModel[],
  }[] = []

  constructor(
    public modulesService: ModulesService,
    private landingService: LandingService,
    public credentialsService: CredentialsService,
    public storeSettingService: StoreSettingService,
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService,
    private productService: ProductService,
    public appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.getCategoryList();
    this.getProductsSlider(this.mostSellSlider);
    this.getProductsSlider(this.mostVisitedSlider);
    this.getLandingSliders();
    console.log("landing-zini")
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories
      this.categories.forEach(category => {
        category.showByScroll = false
        this.getProductsByCategory(category)
      })
      this.categories[0].showByScroll = true;
    })
  }

  getLandingSliders(): void {
    this.landingService.getLandingSliders().subscribe(res => {
      this.landingSliders = res
    })
  }

  getProductsByCategory(category: CategoryModel) {
    this.categoryService.getProductsByCategoryId(category.PRODUCT_ID, 10).subscribe(products => {
      category.products = products?.DATA
    })
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    if (this.categories.length) {
      this.checkCategoriesSliderScrollShow();
    }
  }

  checkCategoriesSliderScrollShow(): void {
    const reversedCategories: CategoryModel[] = [...this.categories];
    const categoryID: number = reversedCategories.reverse().find(f => f.showByScroll == true).PRODUCT_ID
    const _categoryEl: Element = document.querySelector(`.category_${categoryID}`);
    if (isInViewportFromBottom(_categoryEl)) {
      const index: number = this.categories.findIndex(f => f.PRODUCT_ID == categoryID)
      if (this.categories[index + 1]) {
        this.categories[index + 1].showByScroll = true
      }
    }
  }

  getProductsSlider(
    sliderType: {
      type: ProductSliderType,
      products?: ProductSliderModel[]
    },
    limit: number = 10
  ): void {
    this.productService.getProductLimitedSummary(sliderType.type, limit).subscribe(products => {
      sliderType.products = products
    })
  }

}
