import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
import {adjustColor} from "@app/modules/global/functions";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "@app/core/services/ticket.service";
import {p2e} from "@app/modules/global/functions";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

@Component({
  selector: 'base-theme12',
  templateUrl: './base-theme12.component.html',
  styleUrls: ['./base-theme12.component.scss']
})
export class BaseTheme12Component implements OnInit {
  imageUrl: string = environment.ADMIN_API_URL;
  blogs: GeneralAttributeModel[] = []
  ticketForm: FormGroup;
  catalogs: any[] = [];
  searchIcon: boolean = false;
  sidenavStatus = SidenavStatus;
  cartCount: number = 0;

  constructor(
    private landingService: LandingService,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public modulesService: ModulesService,
    public cartService: CartService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit(): void {
    this.onCallCartNotebook();
    this.getBlogs();
    this.createForm();
    this.getCatalog();
  }

  createForm() {
    this.ticketForm = this.formBuilder.group({
      CATALOG_ID: ['', [Validators.required]],
      SUBJECT: ['', [Validators.required]],
      CONTENT: ['', [Validators.required]],
      PHONE_NUMBER: ['', [Validators.required]]
    });
  }

  getCatalog() {
    this.ticketService.getCatalog().subscribe(
      res => {
        this.catalogs = res;
      }
    )
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

  saveChange() {
    this.ticketForm.controls['PHONE_NUMBER'].setValue(p2e(this.ticketForm.value.PHONE_NUMBER))
    this.ticketService.createTicket(this.ticketForm.value).subscribe(
      () => {
        this.notificationService.valid('درخواست شما، با موفقیت ثبت شد')
        this.createForm();
      }
    )
  }

}
