import {Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {CategoryModel} from "@app/core/models/category.model";
import {ProductsFilter, ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";
import SwiperCore, {Autoplay, Navigation, SwiperOptions} from "swiper";
import {CategoryService} from "@app/core/services/category.service";
import {ProductService} from "@app/core/services/product.service";
import {environment} from "@env/environment";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {BannerType} from "@app/core/models/store.model";
import {isInViewportFromBottom} from "@app/modules/global/functions";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";

SwiperCore.use([
  Autoplay,
  Navigation,
]);

@Component({
  selector: 'mk-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainPageComponent implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL
  categories: CategoryModel[] = [];
  productsSlider: {
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
    link?: string,
    query?: { [key: string]: string },
    showByScroll?: boolean
  }[] = [
    {
      name: 'جدیدترین محصولات',
      type: ProductSliderType.latest,
      link: `/store/category/1`,
      showByScroll: true
    },
    {
      name: 'پرفروش ترین ها',
      type: ProductSliderType.bestSellers,
      link: `/store/category/1`,
      query: {'sort': ProductsFilter.mostSell.toString()},
      showByScroll: false
    },
    {
      name: 'پر بازديد ترين ها',
      type: ProductSliderType.mostVisited,
      link: `/store/category/1`,
      query: {'sort': ProductsFilter.mostViewed.toString()},
      showByScroll: false
    },
  ];
  categoriesSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 2500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    autoHeight: true,
    breakpoints: {
      1280: {
        slidesPerView: 5,
        spaceBetween: 30
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 15
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 15,
      },
      640: {
        slidesPerView: 3.5,
        spaceBetween: 10,
        centeredSlides: true,
      },
      300: {
        slidesPerView: 3,
        spaceBetween: 10,
        centeredSlides: false,
      },
    }
  }
  storeBanners: string[] = []
  productsGroup: ProductSliderModel[] = [];

  constructor(
    private storeSettingService: StoreSettingService,
    private categoryService: CategoryService,
    private productService: ProductService,
    public credentialsService: CredentialsService,
    private modulesService: ModulesService
  ) {
  }

  ngOnInit(): void {
    if (this.modulesService.isBardariSoltani) {
      this.productsSlider = this.productsSlider.filter(f => f.type != ProductSliderType.mostVisited)
    }
    this.setProductSliders()
    this.getStoreBanners();
    this.setProducts();
    if (!this.modulesService.isMyFarmasiIran) {
      this.getCategoryList();
    }
  }

  setProducts(): void {
    this.productService.getProductLimitedSummary(ProductSliderType.groupsOffers, 10, this.credentialsService?.credentials?.USER_ROLE_ID).subscribe(products => {
      if (typeof products == 'object') {
        this.productsGroup = products;
      }
    })
  }

  getStoreBanners(): void {
    this.storeSettingService.getBanners(BannerType.storeBanner).subscribe(res => {
      this.storeBanners = res.map(each => environment.ADMIN_API_URL + '/assets/img/settings/' + each.IMAGE)
    })
  }

  setProductSliders(): void {
    this.productsSlider.forEach(sliderSection => {
      this.productService.getProductLimitedSummary(sliderSection.type, 10).subscribe(products => {
        if (typeof products == 'object') {
          sliderSection.products = products;
        }
      })
    })
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories
      this.setCategoriesSlides(categories.length)
      this.categories.forEach(category => {
        category.showByScroll = false
        this.getProductsByCategory(category)
      })
      this.categories[0].showByScroll = true;
    })
  }

  setCategoriesSlides(categoriesLength: number) {
    for (let width of Object.keys(this.categoriesSliderConfig.breakpoints)) {
      if (this.categoriesSliderConfig.breakpoints[width].slidesPerView >= categoriesLength) {
        this.categoriesSliderConfig.breakpoints[width].slidesPerView = categoriesLength
        this.categoriesSliderConfig.navigation = false
      }
    }
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
    this.checkProductsSliderScrollShow();
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

  checkProductsSliderScrollShow(): void {
    const reversedSliders: any[] = [...this.productsSlider];
    const sliderType: ProductSliderType = reversedSliders.reverse().find(f => f.showByScroll == true).type
    const _categoryEl: Element = document.querySelector(`.productSlider_${sliderType}`);
    if (isInViewportFromBottom(_categoryEl)) {
      const index: number = this.productsSlider.findIndex(f => f.type == sliderType)
      if (this.productsSlider[index + 1]) {
        this.productsSlider[index + 1].showByScroll = true
      }
    }
  }

}
