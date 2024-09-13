import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {_window} from "@app/modules/global/global-variable";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {AppService} from "@app/core/services/app.service";
import {CategoryService} from "@app/core/services/category.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {environment} from "@env/environment";
import {adjustColor, calculateDiscount, p2e} from "@app/modules/global/functions";
import {ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";
import {ProductService} from "@app/core/services/product.service";
import * as $ from 'jquery'
// declare var $:any;


import {jarallax} from "jarallax";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "@app/core/services/ticket.service";
import {NotificationService} from "@app/core/services/notification.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

@Component({
  selector: 'base-theme11',
  templateUrl: './base-theme11.component.html',
  styleUrls: ['./base-theme11.component.scss']
})
export class BaseTheme11Component implements OnInit, AfterViewInit {

  imageUrl: string = environment.ADMIN_API_URL;
  fixedHeader: boolean = false;
  products: ProductSliderModel[] = []
  ticketForm: FormGroup;
  catalogs: any[] = [];
  adjustColor = (amount: number, color: string = this.modulesService.primaryColor) => adjustColor(color, amount);
  calculateDiscount = (price: number, priceAfterOffer: number) => calculateDiscount(price, priceAfterOffer)

  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    private categoryService: CategoryService,
    public dragDropService: DragDropService,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private notificationService: NotificationService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit(): void {
    this.getMostSaleProducts();
    this.getCatalog();
    this.createForm();
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

  saveChange() {
    this.ticketForm.controls['PHONE_NUMBER'].setValue(p2e(this.ticketForm.value.PHONE_NUMBER))
    this.ticketService.createTicket(this.ticketForm.value).subscribe(
      () => {
        this.notificationService.valid('درخواست شما، با موفقیت ثبت شد')
        this.createForm();
      }
    )
  }

  getMostSaleProducts(): void {
    this.productService.getProductLimitedSummary(ProductSliderType.bestSellers, 10).subscribe(products => {
      if (typeof products == 'object') {
        this.products = products;
      }
    })
  }

  @HostListener('window:scroll')
  onScroll() {
    this.fixedHeader = this.appService.muchScrolled > 100;
  }

}
