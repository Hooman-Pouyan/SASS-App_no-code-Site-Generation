import {AfterViewInit, Component, HostListener, OnInit, ViewEncapsulation} from '@angular/core';
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {SidenavStatus} from "@app/core/models/cart.model";
import {CartService} from "@app/core/services/cart.service";
import {SearchDialogComponent} from "@app/shared/search-dialog/search-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import Swiper, {Autoplay, Navigation, Pagination, SwiperOptions} from "swiper";
import {
  checkProductStatus,
  ProductSliderModel,
  ProductSliderType,
  ProductStatus,
  ProductStatusName
} from "@app/core/models/product.model";
import {ProductService} from "@app/core/services/product.service";
import {environment} from "@env/environment";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";
import {LandingService} from "@app/core/services/landing.service";
import {CategoryModel} from "@app/core/models/category.model";
import {CategoryService} from "@app/core/services/category.service";
import {SocialMediaContact, SocialType} from "@app/core/models/store.model";
import {AppService} from "@app/core/services/app.service";
import * as L from 'leaflet';
import {StoreService} from "@app/core/services/store.service";
import {_window} from "@app/modules/global/global-variable";

Swiper.use([
  Autoplay,
  Navigation,
  Pagination
]);

@Component({
  selector: 'base-theme21',
  templateUrl: './base-theme21.component.html',
  styleUrls: ['./base-theme21.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme21Component implements OnInit, AfterViewInit {

  imageUrl: string = environment.ADMIN_API_URL;
  window: Window = _window;
  sidenavStatus = SidenavStatus;
  cartCount: number = 0;
  products: ProductSliderModel[] = [];
  blogs: GeneralAttributeModel[] = []
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
    navigation: true
  };
  footerLinks: {
    defaultText: string,
    defaultLink: string,
    type: string
  }[] =
    [
      {
        type: 'base-theme21-footer-help',
        defaultText: 'راهنما',
        defaultLink: '/help'
      },
      // {
      //   type: 'footer-law',
      //   defaultText: 'قوانین و مقررات',
      //   defaultLink: ''
      // },
      {
        type: 'base-theme21-footer-return-of',
        defaultText: 'شرایط مرجوعی کالا',
        defaultLink: '/return-of'
      },
      {
        type: 'base-theme21-footer-contact',
        defaultText: 'تماس با ما',
        defaultLink: '/contact-us'
      },
      {
        type: 'base-theme21-footer-faq',
        defaultText: 'پرسش های متداول',
        defaultLink: '/questions'
      },
      {
        type: 'base-theme21-footer-about',
        defaultText: 'درباره ما',
        defaultLink: '/about-us'
      },
    ];
  categories: CategoryModel[] = [];
  scrolled: boolean = false;

  productStatusName = (status: ProductStatus) => ProductStatusName(status)
  checkProductStatus = (status: ProductStatus) => checkProductStatus(status)

  constructor(
    public dynamicMediaService: DynamicMediaService,
    public dragDropService: DragDropService,
    public storeSettingService: StoreSettingService,
    public cartService: CartService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    private productService: ProductService,
    private matDialog: MatDialog,
    private landingService: LandingService,
    private categoryService: CategoryService,
    public appService: AppService,
    private storeService: StoreService
  ) {
  }

  ngOnInit(): void {
    this.onCallCartNotebook();
    this.getMostSaleProducts();
    this.getCategoryList();
    if (this.modulesService.hasBlog) {
      this.getBlogs();
      this.footerLinks.push({
        type: 'footer-blog',
        defaultText: 'بلاگ',
        defaultLink: '/blog'
      })
    }
  }

  ngAfterViewInit() {
    this.storeService.getCurrentStore().subscribe(
      (store) => {
        if (store.store_addresses[0].X && store.store_addresses[0].Y) {
          this.loadMap(store.store_addresses[0].X, store.store_addresses[0].Y)
        } else {
          this.loadMap(35.7904709, 51.4130323)
        }
      }
    );
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

  loadMap(lat, lng) {
    document.getElementById('mapSection').innerHTML = "<div id='map' style='width: 100%; height: 100%;'></div>";

    const myMap = L.map('map', {
      center: [lat, lng],
      zoom: 17
    });

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      // attribution: 'Map data &copy; ' +
      //   '<a href="https://www.openstreetmap.org/">OpenStreetMap</a> ' +
      //   'contributors, ' +
      //   '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
      //   ' Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 20,
      id: 'mapbox/streets-v11',
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'pk.eyJ1Ijoic2F6YSIsImEiOiJjazcyeGg3aGYwNmVnM2VtczZwanFlN3prIn0.Nch_vaoQFjEVTMST56Yz2g'
    }).addTo(myMap);


    let locationIcon = L.icon({
      iconUrl: '/assets/icons/location.png',
      iconSize: [25, 25],
    });

    L.marker([lat, lng], {icon: locationIcon}).addTo(myMap);
  }

  openSearchDg() {
    this.matDialog.open(SearchDialogComponent, {
      maxWidth: '100%',
      width: '100%',
      height: "100%",
      autoFocus: false,
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = this.appService.muchScrolled >= 100;
  }

  getMostSaleProducts(): void {
    this.productService.getProductLimitedSummary(ProductSliderType.latest, 7).subscribe(products => {
      if (typeof products == 'object') {
        this.products = products;
      }
    })
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories;
    })
  }

  getBlogs(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.blog).subscribe(res => {
      this.blogs = res.map(m => {
        m.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + m.FILES
        return m
      })
    })
  }

  socialLink(social: SocialMediaContact): string {
    if (social.type == SocialType.whatsapp) {
      return social.link.replace('web', 'api')
    } else {
      return social.link
    }
  }


}
