import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";
import {FavouriteService} from "@app/core/services/favourite.service";
import {StoreService} from "@app/core/services/store.service";
import {AppService} from "@app/core/services/app.service";
import {calculateDiscount, copyText, extractGenealogy} from "../../../global/functions";
import {ProductService} from "@app/core/services/product.service";
import {UserGuestService} from "@app/core/services/user-guest.service";
import {OrderService} from "@app/core/services/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {environment} from "@env/environment";
import {LandingService} from 'src/app/core/services/landing.service';
import {NotificationService} from "@app/core/services/notification.service";
import {CartService} from "@app/core/services/cart.service";
import {
  checkProductStatus, ProductAdditionalModel,
  ProductModel,
  ProductSliderModel,
  ProductStatus,
  ProductStatusName,
  ProductUnitStatus
} from "@app/core/models/product.model";
import {CredentialsService} from "@app/core/services/credentials.service";
import SwiperCore, {Autoplay, Navigation, SwiperOptions} from "swiper";
import {UserService} from '@app/core/services/user.service';
import {FactorService} from "@app/core/services/factor.service";
import {_window, videoExtensions} from "@app/modules/global/global-variable";
import {SeoService} from "@app/core/services/seo.service";
import {SEOModel} from "@app/core/models/global.model";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {Location} from "@angular/common";
import {MatDialog} from "@angular/material/dialog";
import {ChartsComponent} from "@app/shared/charts/charts.component";
import {CallToBuyComponent} from "@app/shared/call-to-buy/call-to-buy.component";


SwiperCore.use([
  Autoplay,
  Navigation,
]);

export interface Share {
  title?: string;
  text?: string;
  url?: string;
}

@Component({
  selector: 'default-product',
  templateUrl: './default-product.component.html',
  styleUrls: ['./default-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DefaultProductComponent implements OnInit {

  commentAvg
  productInfo: {
    name: string
    store_id: number
  }

  route: string
  adminImageUrlDevelop: string = environment.ADMIN_API_URL;
  product: ProductModel;
  selectedSize_id: number;
  selectedColor_id: number;
  isFavourite: boolean = false;
  defaultFeatures: any[] = [];
  calculateDiscount = (price: number, priceAfterOffer: number) => calculateDiscount(price, priceAfterOffer);
  productStatusName = (status: ProductStatus) => ProductStatusName(status);
  checkProductStatus = (status: ProductStatus) => checkProductStatus(status);

  productFeatures: {
    img: string,
    desc: string,
    enable: boolean
  }[] = [
    {
      img: 'free_delivery.png',
      desc: 'امکان ارسال رایگان',
      enable: this.factorService.currentOrder.freeCourier
    },
    {
      img: 'guarantee.png',
      desc: 'ضمانت کالا',
      enable: this.modulesService.originalProduct
    },
    {
      img: 'payment_method.png',
      desc: 'امکان پرداخت در محل',
      enable: this.modulesService.payOnSpot
    },
    {
      img: 'return_guarantee.png',
      desc: 'گارانتی بازگشت کالا',
      enable: this.modulesService.returnGuarantee
    },
    {
      img: 'fullTime_support.png',
      desc: 'پشتیبانی 24/7',
      enable: this.modulesService.fullTimeSupport
    },
    {
      img: 'express_delivery.png',
      desc: 'تحویل فوری',
      enable: this.modulesService.expressReceive
    },
  ];
  mediaToShow: string = '';
  images: any[] = [];
  imageSliderConfig: SwiperOptions = {
    autoplay: {
      delay: 2500,
      pauseOnMouseEnter: false,
      disableOnInteraction: false
    },
    loop: false,
    centeredSlides: true,
    breakpoints: {
      '300': {
        slidesPerView: 3.5,
        spaceBetween: 0.5,
        centeredSlides: true,
      },
      '640': {
        slidesPerView: 4.5,
        spaceBetween: 0.5,
        centeredSlides: true,
      },
      '768': {
        slidesPerView: 4.5,
        spaceBetween: 1,
      },
      '1024': {
        slidesPerView: 4,
        spaceBetween: 0.5
      },
    }
  }
  image_magnification: number = 1;
  playAparat: boolean = false;
  playVideo: boolean = false;
  similarProduct: ProductSliderModel[] = [];
  boughtWith: ProductSliderModel[] = [];


  constructor(
    private productService: ProductService,
    public appService: AppService,
    private orderService: OrderService,
    private storeService: StoreService,
    private userGuestService: UserGuestService,
    private favouriteService: FavouriteService,
    private activatedRoute: ActivatedRoute,
    private landingService: LandingService,
    private notificationService: NotificationService,
    private cartService: CartService,
    private factorService: FactorService,
    public modulesService: ModulesService,
    public userService: UserService,
    public credentialService: CredentialsService,
    private seoService: SeoService,
    public storeSettingService: StoreSettingService,
    private location: Location,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.changeRouteSlug();
    this.getData();
    this.route = _window.location.href
  }

  closeWithError() {
    this.appService.serverFailed = true;
  }

  changeRouteSlug(): void {
    // const route = this.activatedRoute.snapshot;
    // const slugName: string = route?.queryParams?.name?.split(' ')?.join('-') || route?.params?.slug?.split(' ')?.join('-');
    // if (slugName) {
    //   this.location.go(`/product/${route.params.id}/${slugName}`);
    // }
  }

  getData() {
    this.activatedRoute.data.subscribe(res => {
      if (res?.product) {
        this.setProductData(res)
      } else {
        this.closeWithError()
      }
    })
  }

  public setProductData(res, fromAnotherComponent: boolean = false): ProductModel {
    this.product = {
      ...res.product.product_store_prices[0],
      PRODUCT_LIMITATION:res.product.PRODUCT_LIMITATION,
      PRODUCT_STORE_ID: res.product.ID,
      IS_FAVORIT: res.product.IS_FAVORIT,
      ...res.product.product,
      AVAILABILITY: res.product.AVAILABILITY,
      HAS_GUARANTEE: res.product.HAS_GUARANTEE,
    }
    if(this.product.AMAZING_END_DATE){
      this.product.AMAZING_END_DATE =
        this.product.AMAZING_END_DATE.replace('-',' ').
        replace('-',' ').replace('T', ' ')

      this.product.AMAZING_END_DATE = this.product.AMAZING_END_DATE.slice(0,this.product.AMAZING_END_DATE.indexOf(':00.'))

    }

    this.setImageProduct(this.product.productImages);
    this.sortFeatures();
    this.setColors();
    this.setSizes();
    this.setFeatures()
    if (!fromAnotherComponent) {
      this.productInfo = {
        name: this.product.NAME,
        store_id: this.product.PRODUCT_STORE_ID
      }
      this.setCounter();
      this.setGenealogy();
      this.setAparat();
      this.setBoughtWith(this.product.PRODUCT_STORE_ID);
      this.setSimilarProducts(this.product.PRODUCT_STORE_ID);
      if (this.modulesService.SEO) {
        this.setSEO(this.product.productAdditional)
      }
    }
    return this.product
  }

  setImageProduct(images: any[]) {
    images.forEach(each => {



      this.images.push(this.adminImageUrlDevelop + '/assets/img/products/' + each.IMAGE)
      if (each.ORDERS == 1) {
        this.mediaToShow = this.adminImageUrlDevelop + '/assets/img/products/' + each.IMAGE
      }
    })

    //images
    this.setMagnification(this.mediaToShow)
  }

  changeImage(image): void {
    const fileExtension: string = image.split(".").pop()
    if (videoExtensions.includes(fileExtension)) {
      this.playVideo = true;
      this.mediaToShow = image;
    } else {
      this.playVideo = false;
      if (image.isTrusted) {
        this.mediaToShow = image.target.currentSrc;
      } else {
        this.mediaToShow = image;
      }
      this.setMagnification(this.mediaToShow)
      this.playAparat = !!image.includes("assets/icons/socials/aparat.png");
    }
  }

  setMagnification(imgUrl) {
    let img = new Image();
    img.src = imgUrl;
    img.onload = (event) => {
      let loadedImage: any = event.currentTarget;
      let width = loadedImage.width;
      if (width > 2000) {
        this.image_magnification = 0.3
      } else if (width > 1000) {
        this.image_magnification = 0.6
      } else if (width > 500) {
        this.image_magnification = 1
      } else {
        this.image_magnification = 2
      }
    }
  }

  setCounter(): void {
    this.product.COUNTER = this.product.PRODUCT_UNIT_ID == ProductUnitStatus.kilogram ? 0.5 : 1
  }

  setGenealogy(): void {
    let genealogy: string[] = this.product.GENEALOGY.split(',').filter(f => f)
    genealogy.pop();
    genealogy.shift();

    let genealogy_name: string[] = this.product.GENEALOGY_NAME.split(',').filter(f => f)
    genealogy_name.pop();
    genealogy_name.shift();

    this.product.category_genealogy = []
    for (let i = 0; i < genealogy.length; i++) {
      this.product.category_genealogy.push({
        ID: +genealogy[i],
        NAME: genealogy_name[i]
      })
    }
  }

  sortFeatures() {
    this.product.product_features = this.product.product_features.sort((a, b) => {
      return a.ID - b.ID
    });
  }

  setAparat() {
    if (this.product.APARAT_LINK && this.modulesService.aparat) {
      let idx = this.product.APARAT_LINK.indexOf('src="')
      this.product.APARAT_LINK = this.product.APARAT_LINK.slice(idx + 5)
      idx = this.product.APARAT_LINK.indexOf('"')
      this.product.APARAT_LINK = this.product.APARAT_LINK.slice(0, idx)
      this.images.push('assets/icons/socials/aparat.png')
    }
  }

  setColors() {
    this.product.product_colors = this.product.product_features.filter(f => f.feature?.NAME == 'رنگ' || f.feature?.NAME.toLowerCase() == 'color')
  }

  setSizes() {
    this.product.product_sizes = this.product.product_features.filter(f =>
      (f.feature?.NAME == 'سایز' || f.feature?.NAME.toLowerCase() == 'size') && f.PARENT_ID == null
    )
  }

  setFeatures() {
    this.defaultFeatures = this.product.product_features;
    this.product.product_features = this.product.product_features.filter(f =>
      f.feature?.NAME != 'رنگ' && f.feature?.NAME.toLowerCase() != 'color'
      && f.feature?.NAME != 'سایز' && f.feature?.NAME.toLowerCase() != 'size'
    )
  }

  setDataForSlider(data: any[]) {
    let products: ProductSliderModel[] = [];

    for (let product of data) {
      products.push({
        NAME: product.product.NAME,
        HAS_GUARANTEE: product.product.HAS_GUARANTEE,
        PRICE: product.product_store_prices[0]?.PRICE,
        PRICE_AFTER_OFFER: product.product_store_prices[0]?.PRICE_AFTER_OFFER,
        PRODUCT_STATUS_ID: product?.product?.PRODUCT_STATUS_ID,
        PRODUCT_BRAND_NAME: product?.product?.product_brand?.NAME,
        PRODUCT_ID: product.PRODUCT_ID,
        PRODUCT_STORE_ID: product.ID,
        PRODUCT_UNIT_ID: product.product.PRODUCT_UNIT_ID,
        IMAGE: product.product.IMAGE,
        CATEGORY_ID: product.product.PRODUCT_PARENT_ID,
        SHORT_DESCRIPTION: product.product.SHORT_DESCRIPTION,
        PRODUCT_PARENT_NAME: extractGenealogy(product.product.GENEALOGY_NAME, 'parent'),
        CATEGORY_NAME: extractGenealogy(product.product.GENEALOGY_NAME, 'parent'),
      })
    }
    return products;
  }

  setBoughtWith(productId) {
    this.productService.getProductsWithProduct(productId).subscribe(
      res => {
        this.boughtWith = this.setDataForSlider(res);
      });
  }

  setSimilarProducts(productId) {
    this.productService.getSimilarProducts(productId).subscribe(
      res => {
        this.similarProduct = this.setDataForSlider(res);
      });
  }

  addProductToCart(hasGuarantee?: boolean) {

    if (this.product.COUNTER <= 0) {
        // let error = "حداقل خرید این محصول " + this.product.PRODUCT_LIMITATION +  " عدد هست!"
        //
        // this.notificationService.warning(error , '',500);
      this.notificationService.error("حداقل خزید این محصول هست !");
      return;
    }

    if (this.product.product_colors?.length && !this.selectedColor_id) {
      this.notificationService.error('برای این محصول باید رنگ انتخاب کنید')
      return;
    }

    if (this.product.product_sizes?.length && !this.selectedSize_id) {
      this.notificationService.error('برای این محصول باید سایز انتخاب کنید')
      return;
    }

    this.cartService.addToCart(
      this.product.PRODUCT_STORE_ID,
      this.product.COUNTER,
      '',
      this.selectedColor_id,
      this.selectedSize_id,
      hasGuarantee
    ).subscribe(
      () => {
        this.notificationService.valid('با موفقیت به سبد خرید اضافه شد')
        // this.cartService.updateLocalCart()
      }
    );
  }

  subFromCart() {

    if (this.product.PRODUCT_UNIT_ID === ProductUnitStatus.kilogram) {
      this.product.COUNTER -= .5;
    } else {
      this.product.COUNTER -= 1;
    }

    if (this.product.COUNTER <= 0) {
      this.deleteProduct(this.product)
    } else {
      this.editProductInCart(this.product)
    }

  }

  editProductInCart(product) {

    let detailID: number = product.order_product_details.length ? product.order_product_details[0]?.ID : undefined

    this.cartService.editProductInCart(product.ID, product.COUNT, product.DESCRIPTION || "", detailID).subscribe(
      () => {
        // this.cartService.updateLocalCart();
      }
    )
  }

  deleteProduct(product) {

    let orderDetailProductId: number;

    if (product.order_product_details?.length) {
      orderDetailProductId = product.order_product_details[0].ID
    }

    this.cartService.deleteProduct(product.ID, orderDetailProductId).subscribe(() => {
      this.notificationService.valid('محصول با موفقیت حذف شد')
      // this.cartService.updateLocalCart();
    });
  }

  addToNotebook() {
    if (this.product.product_colors?.length && !this.selectedColor_id) {
      this.notificationService.error('برای این محصول باید رنگ انتخاب کنید')
      return;
    }

    if (this.product.product_sizes?.length && !this.selectedSize_id) {
      this.notificationService.error('برای این محصول باید سایز انتخاب کنید')
      return;
    }

    this.cartService.addToNotebook(this.product.PRODUCT_STORE_ID, 1, "", this.selectedColor_id, this.selectedSize_id).subscribe(
      () => {
        this.notificationService.valid('با موفقعیت به سبد خرید بعدی اضافه شد')
        // this.cartService.updateLocalNotebook()
      }
    )

  }

  favourite() {
    if (this.isFavourite) {
      this.favouriteService.deleteFavourite(this.product.PRODUCT_STORE_ID).subscribe(
        () => this.isFavourite = false
      )
    } else {
      this.favouriteService.addFavourite(this.product.PRODUCT_STORE_ID).subscribe(
        () => this.isFavourite = true
      )
    }
  }

  copyToClipboard() {
    if (_window.innerWidth < 959) {
      const share: Share = {
        title: this.product.NAME,
        url: _window.location.href
      }
      _window.navigator.share(share);
    } else {
      copyText(_window.location.href)
      this.notificationService.valid('لینک محصول ذخیره شد')
    }
  }

  selectColor(color) {
    let selected_color = this.product.product_colors.find(f => f.ID == color.ID)
    selected_color.selected = !selected_color.selected
    if (selected_color.selected) {
      this.selectedColor_id = selected_color.ID
      this.product.product_colors.forEach(each => {
        if (each.ID != selected_color.ID) {
          each.selected = false
        }
      })
      this.product.product_sizes = this.defaultFeatures.filter(f =>
        (f.feature?.NAME == 'سایز' || f.feature?.NAME == 'Size') && f.PARENT_ID == null
        ||
        f.PARENT_ID == this.selectedColor_id
      )
      this.selectedSize_id = undefined
    } else {
      this.selectedColor_id = undefined
      this.product.product_sizes = this.defaultFeatures.filter(f =>
        (f.feature?.NAME == 'سایز' || f.feature?.NAME == 'Size') && f.PARENT_ID == null
      )
    }
  }

  setSEO(data: ProductAdditionalModel): void {
    const _seo: SEOModel = {
      title: data.META_TITLE,
      url: _window.location.href,
      "og:url": _window.location.href,
      "twitter:url": _window.location.href,
      description: data.META_DESCRIPTION,
      "twitter:description": data.META_DESCRIPTION,
      "og:description": data.META_DESCRIPTION,
    }
    this.seoService.setSEO(_seo)
  }

  callToBuyDialog(): void {
    this.dialog.open(CallToBuyComponent, {
      width: '450px',
      maxWidth: '100%'
    })
  }

}
