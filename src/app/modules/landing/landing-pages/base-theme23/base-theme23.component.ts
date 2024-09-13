import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {SidenavStatus} from "@app/core/models/cart.model";
import {SearchDialogComponent} from "@app/shared/search-dialog/search-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {AppService} from "@app/core/services/app.service";
import Swiper, {Autoplay, Navigation, SwiperOptions} from "swiper";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";
import {environment} from "@env/environment";
import {LandingService} from "@app/core/services/landing.service";
import {HEXtoRGBA} from "@app/modules/global/functions";
import {NgwWowService} from "ngx-wow";
import {CategoryService} from "@app/core/services/category.service";
import {CategoryModel} from "@app/core/models/category.model";

Swiper.use([
  Autoplay,
  Navigation
]);


@Component({
  selector: 'base-theme23',
  templateUrl: './base-theme23.component.html',
  styleUrls: ['./base-theme23.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme23Component implements OnInit, AfterViewInit {

  fixedHeader: boolean = false;
  sidenavStatus = SidenavStatus;
  cartCount: number = 0;
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
  };
  blogs: GeneralAttributeModel[] = [];
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
  news: GeneralAttributeModel[] = [];
  HEXtoRGBA = (hexColor: string, opacity: number) => HEXtoRGBA(hexColor, opacity);

  constructor(
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService,
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    private dialog: MatDialog,
    public appService: AppService,
    private landingService: LandingService,
    private wowService: NgwWowService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.onCallCartNotebook();
    this.getCategoryList();
    if (this.modulesService.hasNews) {
      this.getNews();
    }
    if (this.modulesService.hasBlog) {
      this.getBlogs();
    }
  }

  ngAfterViewInit() {
    this.wowService.init()
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

  openSearchDg() {
    this.dialog.open(SearchDialogComponent, {
      maxWidth: '100%',
      width: '100%',
      height: "100%",
      autoFocus: false,
    });
  }

  getBlogs(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.blog).subscribe(res => {
      this.blogs = res.map(m => {
        m.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + m.FILES
        return m
      })
    })
  }

  getNews(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.news).subscribe(res => {
      this.news = res.map(m => {
        m.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + m.FILES
        return m
      })
    })
  }

}
