import {AfterViewInit, Component, HostListener, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {AppService} from "@app/core/services/app.service";
import {CategoryService} from "@app/core/services/category.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {LandingService} from "@app/core/services/landing.service";
import {ProductService} from "@app/core/services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "@app/core/services/ticket.service";
import {NotificationService} from "@app/core/services/notification.service";
import {environment} from "@env/environment";
import {LandingAttributeModel} from "@app/core/models/landing.model";
import {_window} from "@app/modules/global/global-variable";
import {SidenavStatus} from "@app/core/models/cart.model";
import {jarallax} from "jarallax";
import * as $ from "jquery";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";
import {p2e} from "@app/modules/global/functions";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

@Component({
  selector: 'base-theme13',
  templateUrl: './base-theme13.component.html',
  styleUrls: ['./base-theme13.component.scss']
})
export class BaseTheme13Component implements OnInit, AfterViewInit {

  imageUrl: string = environment.ADMIN_API_URL;
  fixedHeader: boolean = false;
  sidenavStatus = SidenavStatus;
  cartCount: number = 0;
  blogs: GeneralAttributeModel[] = []
  ticketForm: FormGroup;
  catalogs: any[] = [];

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
    public dynamicMediaService: DynamicMediaService,
    private landingService: LandingService
    ) { }

  ngOnInit(): void {
    this.onCallCartNotebook();
    this.getBlogs();
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

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
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

  @HostListener('window:scroll')
  onScroll() {
    this.fixedHeader = this.appService.muchScrolled > 100;
  }

}
