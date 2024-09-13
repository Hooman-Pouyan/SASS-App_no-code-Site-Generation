import { AfterViewInit, Component, ViewChild, OnInit, ViewEncapsulation, ElementRef, HostListener } from '@angular/core';
import { DynamicMediaService } from "@app/core/services/dynamic-media.service";
import { jarallax } from "jarallax";
import SwiperCore, { Navigation, Pagination, SwiperOptions } from "swiper";
import { DragDropService } from "@app/core/services/drag-drop.service";
import { StoreSettingService } from "@app/core/services/store-setting.service";
import { Autoplay } from "swiper/core";
import { SwiperComponent } from "swiper/angular";
import { ModulesService } from '@app/core/services/modules.service';
import { CredentialsService } from '@app/core/services/credentials.service';
import { CartService } from '@app/core/services/cart.service';
import { AppService } from '@app/core/services/app.service';
import { SidenavStatus } from '@app/core/models/cart.model';
import { CategoryService } from '@app/core/services/category.service';
import { CategoryModel } from '@app/core/models/category.model';
import { environment } from '@env/environment';
import { LandingService } from '@app/core/services/landing.service';
import { GeneralAttributeModel, GeneralAttributeType } from "@app/core/models/general-attribute.model";
import {SocialMediaContact, SocialType} from "@app/core/models/store.model";
import {_window} from "@app/modules/global/global-variable";
import {SearchDialogComponent} from '@app/shared/search-dialog/search-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import { adjustColor } from '@app/modules/global/functions';
import { ProductService } from '@app/core/services/product.service';
import { ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";


@Component({
  selector: 'base-theme20',
  templateUrl: './base-theme20.component.html',
  styleUrls: ['./base-theme20.component.scss']
})
export class BaseTheme20Component implements OnInit {

  adjustColor = (amount: number, color: string = this.modulesService.primaryColor) => adjustColor(color, amount);
  imageUrl: string = environment.ADMIN_API_URL;
  window: Window = _window;
  products: ProductSliderModel[] = []
  features: GeneralAttributeModel[]  =[]
  categories: CategoryModel[] = [];
  selectedCategory: CategoryModel;


  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public dragDropService: DragDropService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    private categoryService: CategoryService,
    private landingService: LandingService,
    private elementRef:ElementRef,
    public dynamicMediaService: DynamicMediaService,
    private dialog: MatDialog,
    private productService: ProductService

  ) { }

  ngOnInit(): void {
    this.getMostSaleProducts();
    this.getFeatures();
    this.getCategoryList();

  }

  socialLink(social: SocialMediaContact): string {
    if (social.type == SocialType.whatsapp) {
      return social.link.replace('web', 'api')
    } else {
      return social.link
    }
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

  getCategoryList(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      this.categories = categories;
      this.selectedCategory = this.categories[0];
      this.getProductsByCategory(this.selectedCategory)
    })
  }

  getProductsByCategory(category: CategoryModel) {
    this.categoryService.getProductsByCategoryId(category.PRODUCT_ID, 8).subscribe(products => {
      category.products = products?.DATA
    })
  }


  getFeatures(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.attribute).subscribe(res => {
      this.features = res.map(el => {
        el.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + el.FILES
        return el
      })
    })
  }

  getMostSaleProducts(): void {
    this.productService.getProductLimitedSummary(ProductSliderType.bestSellers, 8).subscribe(products => {
      if (typeof products == 'object') {
        this.products = products;
      }
    })
  }

  searchDialog() {
    this.dialog.open(SearchDialogComponent, {
      width: '400px',
      maxWidth: '100%',
    });
  }

}
