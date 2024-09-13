import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {environment} from "@env/environment";
import SwiperCore, {Autoplay, Navigation, SwiperOptions} from 'swiper';
import {LandingService} from "@app/core/services/landing.service";
import {ModulesService} from '@app/core/services/modules.service';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {FactorService} from "@app/core/services/factor.service";
import {ProductsFilter, ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";
import {ProductService} from "@app/core/services/product.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {SearchDialogComponent} from '@app/shared/search-dialog/search-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {DragDropService} from "@app/core/services/drag-drop.service";

SwiperCore.use([
  Navigation,
  Autoplay,
]);
@Component({
  selector: 'base-theme14',
  templateUrl: './base-theme14.component.html',
  styleUrls: ['./base-theme14.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BaseTheme14Component implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;
  searchIcon: boolean = false;
  products: ProductSliderModel[] = [];
  mainSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 3500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    centeredSlides: true,
    navigation: true
  };
  productsSummary: {
    name: string,
    type: ProductSliderType,
    products?: ProductSliderModel[],
    link?: string,
    query?: { [key: string]: string }
  } = {
      name: 'پرفروش ترین ها',
      type: ProductSliderType.bestSellers,
      link: `/store/category/1`,
      query: { 'sort': ProductsFilter.mostSell.toString() }
    };


  constructor(
    private landingService: LandingService,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public modulesService: ModulesService,
    private factorService: FactorService,
    private productService: ProductService,
    private dialog: MatDialog,
    public dynamicMediaService: DynamicMediaService,
    public dragDropService: DragDropService
  ) {
  }

  ngOnInit(): void {
    this.getProductsSlider(this.productsSummary);
  }

  getProductsSlider(sliderType: {
    type: ProductSliderType,
    products?: ProductSliderModel[]
  }): void {
    this.productService.getProductLimitedSummary(sliderType.type, 8).subscribe(products => {
      sliderType.products = products
    })
  }

  searchDialog() {
    this.dialog.open(SearchDialogComponent, {
      width: '400px',
      maxWidth: '100%',
    });
  }

}
