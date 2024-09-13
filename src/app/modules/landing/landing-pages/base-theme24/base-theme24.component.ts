import {Component, HostListener, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {AppService} from "@app/core/services/app.service";
import {CategoryService} from "@app/core/services/category.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {ProductService} from "@app/core/services/product.service";
import {FormBuilder} from "@angular/forms";
import {TicketService} from "@app/core/services/ticket.service";
import {NotificationService} from "@app/core/services/notification.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {CategoryModel} from "@app/core/models/category.model";
import {environment} from "@env/environment";
import {SwiperOptions} from "swiper";
import { SwiperComponent } from "swiper/angular";
import { adjustColor } from '@app/modules/global/functions';

// import Swiper core and required modules
import SwiperCore, { Parallax, Pagination, Navigation } from "swiper";
import {_window} from "@app/modules/global/global-variable";

// install Swiper modules
SwiperCore.use([Parallax, Pagination, Navigation]);

@Component({
  selector: 'base-theme24',
  templateUrl: './base-theme24.component.html',
  styleUrls: ['./base-theme24.component.scss']
})
export class BaseTheme24Component implements OnInit {

  adjustColor = (amount: number, color: string = this.modulesService.primaryColor) => adjustColor(color, amount);

  ScrollFlag: boolean = true;
  categories: CategoryModel[] = [];
  selectedCategory = {} as CategoryModel;

  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
  };

  imageUrl: string = environment.ADMIN_API_URL;

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
  ) {
  }

  ngOnInit(): void {
    this.getCategoryList();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.ScrollFlag = this.appService.muchScrolled < 80;
  }

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories;
      this.selectedCategory = this.categories[0];
      this.getProductsByCategory(this.selectedCategory)
    })
  }

  categoriesToggle(categoryID: number) {
    const _category: CategoryModel = this.categories.find(f => f.PRODUCT_ID == categoryID)
    this.selectedCategory = _category;
    if (!(_category.products?.length >= 1)) {
      this.getProductsByCategory(this.selectedCategory)
    }
  }

  getProductsByCategory(category: CategoryModel) {
    this.categoryService.getProductsByCategoryId(category.PRODUCT_ID, 8).subscribe(products => {
      category.products = products?.DATA
    })
  }

}
