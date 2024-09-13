import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import Swiper, {Autoplay, Navigation, SwiperOptions} from "swiper";
import {NgwWowService} from "ngx-wow";
import {jarallax} from "jarallax";
import * as $ from "jquery";
import {
  checkProductStatus,
  ProductSliderModel,
  ProductSliderType,
  ProductStatus,
  ProductUnitStatus
} from "@app/core/models/product.model";
import {ProductService} from "@app/core/services/product.service";
import {environment} from "@env/environment";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CartService} from "@app/core/services/cart.service";
import {NotificationService} from "@app/core/services/notification.service";
import {ModulesService} from "@app/core/services/modules.service";
import {SocialMediaContact, SocialType} from "@app/core/models/store.model";
import {_window} from "@app/modules/global/global-variable";

Swiper.use([
  Autoplay,
  Navigation,
]);

@Component({
  selector: 'base-theme19',
  templateUrl: './base-theme19.component.html',
  styleUrls: ['./base-theme19.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme19Component implements OnInit, AfterViewInit {

  window: Window = _window;
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
    navigation: true,
    observer: true,
    observeParents: true,
  };
  products: ProductSliderModel[] = [];
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
  imageUrl: string = environment.ADMIN_API_URL;
  checkProductStatus = (status: ProductStatus) => checkProductStatus(status)

  constructor(
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService,
    private wowService: NgwWowService,
    private productService: ProductService,
    public storeSettingService: StoreSettingService,
    private cartService: CartService,
    private notificationService: NotificationService,
    public modulesService: ModulesService
  ) {
  }

  ngOnInit(): void {
    this.getMostSaleProducts();
  }

  ngAfterViewInit() {
    this.wowService.init();
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

  getMostSaleProducts(): void {
    this.productService.getProductLimitedSummary(ProductSliderType.bestSellers, 4).subscribe(products => {
      if (typeof products == 'object') {
        this.products = products;
      }
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

  socialLink(social: SocialMediaContact): string {
    if (social.type == SocialType.whatsapp) {
      return social.link.replace('web', 'api')
    } else {
      return social.link
    }
  }
}
