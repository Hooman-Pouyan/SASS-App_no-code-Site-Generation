import {AfterContentChecked, ChangeDetectorRef, Component, Inject, OnInit, Renderer2} from '@angular/core';
import {UserGuestService} from './core/services/user-guest.service';
import {AppService} from './core/services/app.service';
import {SwUpdate} from '@angular/service-worker';
import {ModulesService} from "./core/services/modules.service";
import {AuthService} from "./core/services/auth.service";
import {DOCUMENT} from "@angular/common";
import {CredentialsService} from "@app/core/services/credentials.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {SocialType, StoreSettingType} from "@app/core/models/store.model";
import {environment} from "@env/environment";
import {intersectionByKey} from "@app/modules/global/functions";
import {FactorService} from "@app/core/services/factor.service";
import {Meta} from "@angular/platform-browser";
import {loadClarity, loadGoftino, loadGTagManager, loadYektanet} from "@app/modules/global/external-functions";
import {SEOModel} from "@app/core/models/global.model";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs/operators";
import {SeoService} from "@app/core/services/seo.service";
import {_window} from "@app/modules/global/global-variable";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {UserRoles} from "@app/core/models/credentials.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterContentChecked {

  SEOs: SEOModel[];

  constructor(
    private authService: AuthService,
    public credentialsService: CredentialsService,
    private userGuestService: UserGuestService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public modulesService: ModulesService,
    private appService: AppService,
    private storeSettingService: StoreSettingService,
    private update: SwUpdate,
    private changeDetector: ChangeDetectorRef,
    private factorService: FactorService,
    private meta: Meta,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
    private dragDropServices: DragDropService,
    private dynamicMediaService: DynamicMediaService
  ) {
  }



  ngOnInit(): void {
    this.modulesService.setModules().then(() => {
      this.getStoreDetail();
      this.activatedRoute.queryParams.subscribe(query => {
        if (_window.top != _window.self) {
          if (query?.token) {
            this.credentialsService.token = query.token
            this.authService.checkToken().subscribe(
              credential => {
                this.credentialsService.credentials = {
                  ID: credential.ID,
                  NAME: credential.NAME,
                  ROLE_ID: credential.user_roles[0].ROLE_ID,
                  USER_NAME: credential.USER_NAME,
                  USER_ROLE_ID: credential.user_roles[0].ID,
                  TOKEN: this.credentialsService.token
                }
              },
              () => {
                this.userGuestService.signUpGuest()
              }
            )
          }
        } else {
          this.authService.checkToken().subscribe(
            credential => {
              if (credential.user_roles[0].ROLE_ID != UserRoles.admin) {
                this.credentialsService.credentials = {
                  ID: credential.ID,
                  NAME: credential.NAME,
                  ROLE_ID: credential.user_roles[0].ROLE_ID,
                  USER_NAME: credential.USER_NAME,
                  USER_ROLE_ID: credential.user_roles[0].ID,
                  TOKEN: this.credentialsService.token
                }
              } else {
                this.credentialsService.logout(false)
              }
            },
            () => {
              this.userGuestService.signUpGuest()
            }
          )
        }
      })
    });
    this.dynamicMediaService.initMedias();
    this.dragDropServices.getDragDrop();
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  getStoreDetail() {
    this.storeSettingService.getStoreSetting().subscribe(store => {
      this.storeSettingService.getStoreContactUs().subscribe((contactUs: any[]) => {
        this.setStoreDetail(store, contactUs);
        this.setFavAndTitle(store);
        this.checkExternalScripts(store);
        this.checkModules();
        this.setGuaranteePrice(contactUs);
      })
    })
  }

  setStoreDetail(store, contactUs: any[]) {
    let socials = intersectionByKey(
      contactUs.map((el) => {
        el.NAME = el.NAME.toLowerCase()
        return el
      }),
      Object.values(SocialType),
      'NAME',
      null
    )
    if (store.SAMANDEHI_LINK) {
      var samandehi_img: string = store.SAMANDEHI_LINK.substring(
        store.SAMANDEHI_LINK.indexOf("src = '") + 7,
        store.SAMANDEHI_LINK.indexOf(`'`, store.SAMANDEHI_LINK.indexOf("src = '") + 7)
      )
      var samandehi_id: string = store.SAMANDEHI_LINK.substring(
        store.SAMANDEHI_LINK.indexOf("id = '") + 6,
        store.SAMANDEHI_LINK.indexOf(`'`, store.SAMANDEHI_LINK.indexOf("id = '") + 6)
      )
      var samandehi_link: string = store.SAMANDEHI_LINK.substring(
        store.SAMANDEHI_LINK.indexOf(`window.open("`) + 13,
        store.SAMANDEHI_LINK.indexOf(`"`, store.SAMANDEHI_LINK.indexOf(`window.open("`) + 13)
      )
    }

    this.storeSettingService.store = {
      id: store.STORE_ID,
      name: store.NAME,
      logo: `${environment.ADMIN_API_URL}/assets/img/settings/${store.LOGO}`,
      aboutUs: store.ABOUT_US,
      email: store.EMAIL,
      phone: store.PHONE,
      etemad_electronic: store.ETEMAD_ELECTRONIC_LINK,
      samandehiImg: samandehi_img,
      samandehiLink: samandehi_link,
      samandehiId: samandehi_id,
      help: store.GUIDE,
      returnOfGoods: store.RETURN_OF_GOOD,
      laws: store.RULES,
      questions: store.QUESTIONS,
      minToBuy: store.MIN_TO_BUY,
      address: store.ADDRESS,
      appLink: this.modulesService.isFreeTry ?
        "https://panel.samplesiteesho.ir/assets/app/customer_app.apk" :
        `${environment.ADMIN_API_URL}/assets/app/customer_app.apk`,
      socials: socials.map((el) => {
        if (el.VALUE) {
          return {
            type: el.NAME,
            link: el.VALUE
          }
        }
      }).filter(f => f),
      supportNumbers: contactUs.filter(f => f.NAME.includes('support_number_') && f.VALUE && f.VALUE != 'null' && f.VALUE != 'undefined')
    };
  }

  setFavAndTitle(store): void {
    const faviconEl: any = document.getElementById('favicon');
    const appleTouchIcon: any = document.getElementById('apple-touch-icon');
    faviconEl.href = `${environment.ADMIN_API_URL}/assets/img/settings/${store.FAV_ICON}`;
    appleTouchIcon.href = `${environment.ADMIN_API_URL}/assets/img/settings/${store.FAV_ICON}`;
    document.getElementById('title').innerHTML = store.NAME;
  }

  checkExternalScripts(store): void {
    Object.keys(StoreSettingType).map(key => {
      const scriptToken = store[StoreSettingType[key]]
      if (this.modulesService[key] && scriptToken && !this.credentialsService.isAdmin) {
        if (key == 'clarity') {
          loadClarity(scriptToken);
        }
        if (key == 'goftino') {
          loadGoftino(scriptToken);
        }
        if (key == 'yektanet') {
          loadYektanet(scriptToken);
        }
        if (key == 'googleTagManager') {
          loadGTagManager(scriptToken);
        }
        if (key == 'googleSearchConsole') {
          this.seoService.updateMetaTag('google-site-verification', scriptToken)
        }
      }
    })
  }

  setGuaranteePrice(res): void {
    this.storeSettingService.guaranteePrice = +res.find(f => f.NAME == 'GUARANTEE')?.VALUE
  }

  checkModules(): void {
    if (!this.modulesService.isInfoBase) {
      this.factorService.updateOrderAndCourierType();
    }

    if (this.modulesService.hasApplication) {
      this.checkPWAManifest();
    }

    if (this.modulesService.SEO) {
      this.storeSettingService.getSeoData().subscribe(res => {
        this.SEOs = res.data;
        const seo: SEOModel = this.SEOs.find(f => f.url == this.router.url)

        // for first time
        if (!this.router.url.includes('product') && seo) {
          seo.id = undefined;
          this.seoService.setSEO(seo)
        }

        this.router.events.pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe((nav: NavigationEnd) => {
          const seo: SEOModel = this.SEOs.find(f => f.url == nav.url)

          if (seo && !nav.url.includes('product')) {
            seo.id = undefined;
            this.seoService.setSEO(seo)
          } else if (!nav.url.includes('product')) {
            this.seoService.setSEO({
              url: nav.url,
              title: this.storeSettingService.store.name,
            })
          }
        })
      })
    }

  }

  checkTheme(): string {
    let cloudColor: string;

    if (this.modulesService.primaryColor?.includes('#')) {
      cloudColor = this.modulesService.primaryColor
    } else {
      const colorPalette = {
        0: 'purple',
        1: 'black',
        61: 'cyan',
        62: 'yellow',
        63: 'brown',
        64: 'lightblue',
        65: 'darkblue',
        66: 'green',
        67: 'mediumpurple',
        69: 'pink',
        70: 'gold',
        71: 'grey',
        72: 'orange',
        73: 'red',
        500: '#105652',
      }
      cloudColor = this.modulesService.primaryColor in colorPalette ? colorPalette[this.modulesService.primaryColor] : 'black'
    }

    this.document.documentElement.style
      .setProperty('--custom-primary-color', cloudColor);

    this.document.documentElement.style
      .setProperty('--custom-accent-color', this.modulesService.accentColor || '#000');

    this.renderer.addClass(this.document.body, 'theme-custom')

    this.meta.updateTag(
      {name: 'theme-color', content: cloudColor},
      'name=theme-color'
    )

    return 'theme-custom'
  }

  checkLanguage() {
    if (this.modulesService.lang) {
      this.renderer.addClass(this.document.body, this.modulesService.lang != 'fa' ? (this.modulesService.lang || 'def') : 'def');
    }
    return this.modulesService.lang != 'fa' ? (this.modulesService.lang || 'def') : 'def'
  }

  checkFont(): string {
    if (this.modulesService.lang == 'fa') {
      const fontFamily: string = this.modulesService.font || 'IRANSans';
      this.document.documentElement.style
        .setProperty('--font-family', fontFamily);
      return fontFamily
    } else {
      const fontFamily: string = 'Roboto';
      this.document.documentElement.style
        .setProperty('--font-family', fontFamily);
      // this.document.documentElement.dir = 'ltr';
      this.document.body.dir = 'ltr';
      if (!this.document.documentElement.classList.contains('en')) {
        this.document.documentElement.classList.add('en')
      }
      return fontFamily
    }
  }

  checkPWAManifest(): void {
    const faviconEl: any = document.getElementById('favicon');

    let myDynamicManifest = {
      "name": this.storeSettingService.store.name,
      "short_name": this.storeSettingService.store.name,
      "description": this.storeSettingService.store.motto,
      "display": "standalone",
      "orientation": "portrait",
      "scope": _window.location.origin,
      "start_url": _window.location.origin,
      "developer": {
        "name": "Hossein Sadeghi",
        "url": "https://www.linkedin.com/in/hossein-sadeghi-077092209/"
      },
      "background_color": "#fafafa",
      "theme_color": this.document.documentElement.style
        .getPropertyValue('--custom-primary-color'),
      "icons": [
        {
          "src": `${faviconEl.href}`,
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any"
        },
      ]
    }
    const stringManifest = JSON.stringify(myDynamicManifest);
    const blob = new Blob([stringManifest], {type: 'application/json'});
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = function () {
      const manifest: any = reader.result
      document.querySelector('#PWAManifest').setAttribute('href', manifest);
    };
  }

  checkDragging(): string {
    if (this.credentialsService.isAdmin) {
      const dragElement: Element = document.querySelector('.cdk-drag-dragging');
      document.querySelectorAll("a").forEach((each: HTMLAnchorElement) => {
        if (!each.href.includes('javascript:void(0)')) {
          each.setAttribute('href_link', each.href);
        }
        each.href = 'javascript:void(0)';
        each.target = '_self';
      })
      let dragParentElement: Element;

      if (dragElement) {
        if (dragElement.parentElement.childElementCount <= 1) {
          dragParentElement = dragElement.parentElement.parentElement
        } else {
          dragParentElement = dragElement.parentElement
        }
      }

      if (dragElement) {
        dragParentElement.classList.add('border-drag')
      } else {
        const _dragParentElement: Element = document.querySelector('.border-drag');
        _dragParentElement?.classList?.remove('border-drag')
      }
    }

    return ''
  }

}
