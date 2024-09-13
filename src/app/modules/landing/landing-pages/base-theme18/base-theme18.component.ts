import {AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation, ElementRef, HostListener} from '@angular/core';
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {jarallax} from "jarallax";
import SwiperCore, {Navigation, Pagination, SwiperOptions} from "swiper";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {Autoplay} from "swiper/core";
import {SwiperComponent} from "swiper/angular";
import {ModulesService} from '@app/core/services/modules.service';
import {CredentialsService} from '@app/core/services/credentials.service';
import {CartService} from '@app/core/services/cart.service';
import {AppService} from '@app/core/services/app.service';
import {SidenavStatus} from '@app/core/models/cart.model';
import {CategoryService} from '@app/core/services/category.service';
import {CategoryModel} from '@app/core/models/category.model';
import {environment} from '@env/environment';
import {LandingService} from '@app/core/services/landing.service';
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";
import {SocialMediaContact, SocialType} from "@app/core/models/store.model";
import {NgwWowService} from "ngx-wow";
import {HEXtoRGBA} from "@app/modules/global/functions";
import {_window} from "@app/modules/global/global-variable";

SwiperCore.use([
  Autoplay,
]);

@Component({
  selector: 'base-theme18',
  templateUrl: './base-theme18.component.html',
  styleUrls: ['./base-theme18.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme18Component implements OnInit, AfterViewInit {

  imageUrl: string = environment.ADMIN_API_URL
  window: Window = _window;
  sidenavStatus = SidenavStatus;
  cartCount: number = 0;
  categories: CategoryModel[] = [];
  blogs: GeneralAttributeModel[] = []
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 5500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
  };
  footerLinks: {
    defaultText: string,
    defaultLink: string,
    type: string
  }[] = [
      {
        type: 'base-theme18-footer-help',
        defaultText: 'راهنما',
        defaultLink: '/help'
      },
      // {
      //   type: 'footer-law',
      //   defaultText: 'قوانین و مقررات',
      //   defaultLink: ''
      // },
      {
        type: 'base-theme18-footer-return-of',
        defaultText: 'شرایط مرجوعی کالا',
        defaultLink: '/return-of'
      },
      {
        type: 'base-theme18-footer-contact',
        defaultText: 'تماس با ما',
        defaultLink: '/contact-us'
      },
      {
        type: 'base-theme18-footer-faq',
        defaultText: 'پرسش های متداول',
        defaultLink: '/questions'
      },
      {
        type: 'base-theme18-footer-about',
        defaultText: 'درباره ما',
        defaultLink: '/about-us'
      },
    ];
  HEXtoRGBA = (hexColor: string, opacity: number) => HEXtoRGBA(hexColor, opacity);
  fixedHeader: boolean = false

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public dragDropService: DragDropService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    private categoryService: CategoryService,
    private landingService: LandingService,
    private wowService: NgwWowService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit() {
    this.onCallCartNotebook();
    this.getCategoryList();
    this.getBlogs();
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

  @HostListener('window:scroll')
  onScroll() {
    this.fixedHeader = this.appService.muchScrolled >= 50;
  }



}
