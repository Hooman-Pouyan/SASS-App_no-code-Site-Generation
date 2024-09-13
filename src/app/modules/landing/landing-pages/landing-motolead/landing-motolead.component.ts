import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {SwiperOptions} from "swiper";
import {environment} from "@env/environment";
import {ModulesService} from "@app/core/services/modules.service";
import {LandingService} from "@app/core/services/landing.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CategoryService} from "@app/core/services/category.service";
import {MatDialog} from "@angular/material/dialog";
import {NotificationService} from "@app/core/services/notification.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";
import {ProductService} from "@app/core/services/product.service";
import {CategoryModel} from "@app/core/models/category.model";
import {NgwWowService} from "ngx-wow";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";
import {HEXtoRGBA} from "@app/modules/global/functions";

@Component({
  selector: 'landing-motolead',
  templateUrl: './landing-motolead.component.html',
  styleUrls: ['./landing-motolead.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LandingMotoleadComponent implements OnInit, AfterViewInit {

  imageUrl: string = environment.ADMIN_API_URL;
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3000,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
    pagination: {
      clickable: true,
      dynamicBullets: true,
    },
  };
  mostSellSlider: {
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
    link?: string,
    query?: {[key: string]: string}
  } = {
    name: 'پرفروش‌ترین کالاها',
    type: ProductSliderType.bestSellers,
    products: [],
    link: `/store/category/1`
  };
  recentProductSlider: {
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
    link?: string,
    query?: {[key: string]: string}
  } = {
    name: 'جدیدترین کالاها',
    type: ProductSliderType.latest,
    products: [],
    link: `/store/category/1`
  };
  categories: CategoryModel[] = [];
  categoriesSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 2500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    loop: true,
    navigation: true,
    breakpoints: {
      1280: {
        slidesPerView: 7
      },
      1024: {
        slidesPerView: 6
      },
      500: {
        slidesPerView: 5
      },
      450: {
        slidesPerView: 4
      },
      425: {
        slidesPerView: 3
      },
      225: {
        slidesPerView: 2
      },
    },
    slidesOffsetBefore: 30
  };
  blogs: GeneralAttributeModel[] = [];
  HEXtoRGBA = (hexColor: string, opacity: number) => HEXtoRGBA(hexColor, opacity);

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
    private wowService: NgwWowService
  ) { }

  ngOnInit(): void {
    this.getProductsSlider(this.mostSellSlider);
    this.getProductsSlider(this.recentProductSlider);
    this.getCategoryList();
    this.getNews();
  }

  ngAfterViewInit() {
    this.wowService.init()
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  getProductsSlider(sliderType: {
    type: ProductSliderType,
    products?: ProductSliderModel[]
  }): void {
    this.productService.getProductLimitedSummary(sliderType.type, 8).subscribe(products => {
      sliderType.products = products
    })
  }

  getNews(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.blog).subscribe(res => {
      this.blogs = res.map(m => {
        m.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + m.FILES
        return m
      })
    })
  }

}
