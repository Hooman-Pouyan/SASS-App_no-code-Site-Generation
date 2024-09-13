import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DragDropService} from "@app/core/services/drag-drop.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {AppService} from "@app/core/services/app.service";
import {CategoryService} from "@app/core/services/category.service";
import {CategoryModel} from "@app/core/models/category.model";
import {SidenavStatus} from "@app/core/models/cart.model";
import {SocialMediaContact, SocialType} from "@app/core/models/store.model";
import {_window} from "@app/modules/global/global-variable";
import SwiperCore, {Navigation, Pagination, SwiperOptions} from "swiper";
import {Autoplay} from "swiper/core";
import {environment} from "@env/environment";
import {SearchDialogComponent} from "@app/shared/search-dialog/search-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

SwiperCore.use([
  Pagination,
  Autoplay,
  Navigation
]);

@Component({
  selector: 'base-theme9',
  templateUrl: './base-theme9.component.html',
  styleUrls: ['./base-theme9.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme9Component implements OnInit {

  categories: CategoryModel[] = [];
  sidenavStatus = SidenavStatus;
  cartCount: number = 0;
  imageUrl: string = environment.ADMIN_API_URL
  window: Window = _window;

  footerLinks: {
    defaultText: string,
    defaultLink: string,
    type: string
  }[] = [
    {
      type: 'footer-help',
      defaultText: 'راهنما',
      defaultLink: '/help'
    },
    {
      type: 'footer-return-of',
      defaultText: 'شرایط مرجوعی کالا',
      defaultLink: '/return-of'
    },
    {
      type: 'footer-contact',
      defaultText: 'تماس با ما',
      defaultLink: '/contact-us'
    },
    {
      type: 'footer-faq',
      defaultText: 'پرسش های متداول',
      defaultLink: '/questions'
    },
    {
      type: 'footer-about',
      defaultText: 'درباره ما',
      defaultLink: '/about-us'
    },
  ]
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

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    private categoryService: CategoryService,
    public dragDropService: DragDropService,
    private dialog: MatDialog,
    public dynamicMediaService: DynamicMediaService
  ) { }

  ngOnInit(): void {
    this.onCallCartNotebook();
    this.getCategoryList();
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

  socialLink(social: SocialMediaContact): string {
    if (social.type == SocialType.whatsapp) {
      return social.link.replace('web', 'api')
    } else {
      return social.link
    }
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories
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

}
