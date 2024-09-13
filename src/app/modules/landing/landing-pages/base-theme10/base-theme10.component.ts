import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {DragDropService} from "@app/core/services/drag-drop.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {SearchDialogComponent} from "@app/shared/search-dialog/search-dialog.component";
import {SidenavStatus} from "@app/core/models/cart.model";
import {ModulesService} from "@app/core/services/modules.service";
import {MatDialog} from "@angular/material/dialog";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {CartService} from "@app/core/services/cart.service";
import SwiperCore, {Navigation, SwiperOptions} from "swiper";
import {Autoplay} from "swiper/core";
import {CredentialsService} from "@app/core/services/credentials.service";
import {adjustColor, p2e} from "@app/modules/global/functions";
import {ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";
import {ProductService} from "@app/core/services/product.service";
import {environment} from "@env/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "@app/core/services/ticket.service";
import {NotificationService} from "@app/core/services/notification.service";
import {jarallax} from "jarallax";

SwiperCore.use([
  Autoplay,
  Navigation
]);

@Component({
  selector: 'base-theme10',
  templateUrl: './base-theme10.component.html',
  styleUrls: ['./base-theme10.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme10Component implements OnInit, AfterViewInit {

  sidenavStatus = SidenavStatus;
  cartCount: number = 0;
  adjustColor = (amount: number, color: string = this.modulesService.primaryColor) => adjustColor(color, amount);
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
    navigation: true
  };
  products: ProductSliderModel[] = [];
  imageUrl: string = environment.ADMIN_API_URL;
  ticketForm: FormGroup;
  catalogs: any[] = [];

  constructor(
    public dragDropService: DragDropService,
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    private dialog: MatDialog,
    public dynamicMediaService: DynamicMediaService,
    public cartService: CartService,
    public credentialsService: CredentialsService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.setProducts();
    this.createForm();
    this.getCatalog();
  }

  ngAfterViewInit() {
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

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
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

  setProducts(): void {
    this.productService.getProductLimitedSummary(ProductSliderType.mostVisited, 5).subscribe(products => {
      if (typeof products == 'object') {
        this.products = products;
      }
    })
  }

  saveChange() {
    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return
    }
    this.ticketForm.controls['PHONE_NUMBER'].setValue(p2e(this.ticketForm.value.PHONE_NUMBER))
    this.ticketService.createTicket(this.ticketForm.value).subscribe(
      () => {
        this.notificationService.valid('درخواست شما، با موفقیت ثبت شد')
        this.createForm();
      }
    )
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
