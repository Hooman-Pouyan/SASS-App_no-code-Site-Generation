import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { TranslateService } from "@ngx-translate/core";
import { AppService } from './app.service';
import { IphoneGuideDialogComponent } from 'src/app/shared/iphone-guide-dialog/iphone-guide-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";
import {CookieService} from "@app/core/services/cookie.service";

interface ModuleModel {
  COLOR?: string;
  ACCENT_COLOR?: string;
  THEME?: number;
  GUILD_CATEGORY_ID?: number;
  LANG?: string[] | string;
  FONT?: string;
  getModules?: { ID: number }[];
}

let modulesIDs = {
  replaceModule: 2000,
  discountGenerator: 2001,
  orderProcedure: 2003,
  employee: 2004,
  wallet: 2005,
  aloPeyk: 2006,
  onlineChat: 2007,
  cheque: 2008,
  notebook: 2009,
  idPay: 2010,
  sabin: 2011,
  noSignUp: 2012,
  luckyWheel: 2013,
  rankPoint: 2014,
  digiKala: 2015,
  aparat: 2016,
  pastime: 2017,
  popUp: 2018,
  currency: 2019,
  customDelivery: 2022,
  twoPhasePay: 2023,
  instagram_robot: 2032,
  hideFactorOrderDate: 2033,
  productLink: 2037,
  additionalCost: 2038,
  tax: 2074,
  zarinpal: 2077,
  consult: 2076,
  torob: 2078,
  payOnSpot: 2079,
  expressReceive: 2080,
  original: 2081,
  returnGuarantee: 2082,
  fullTimeSupport: 2083,
  hasApplication: 2084,
  postalCode: 2087,
  infoBase: 2088,
  paypalGateway: 2089,
  news: 2090,
  onlyOTP: 2094,
  payByPOS: 4103,
  orderComment: 4105,
  minimumOrderProduct: 4113,
  productComments: 4122,
  ourServices: 4123,
  landingCategorySetting: 4124,
  blog: 4127,
  whatsAppBtn: 4128,
  miniContactUs: 4129,
  goftino: 4131,
  courierMaximumSupport: 4132,
  SEO: 4133,
  googleTagManager: 4134,
  googleAnalytics: 4135,
  clarity: 4136,
  yektanet: 4137,
  productInputCounter: 4138,
  siteeshoLicense: 4139,
  noOTP: 4140,
  noReferralCode: 4141,
  categoriesDrawer: 4142,
  noAuthenticate: 4146,
  disableMapLocation: 4147,
  rial: 4148,
  googleSearchConsole: 4152,
  customerCounter : 2092,
  video : 2095,
  quiz : 2097,
  loginWithEmailPhone : 3018,
}

@Injectable({
  providedIn: 'root'
})
export class ModulesService {

  private features: ModuleModel = {}

  constructor(
    private httpClient: HttpClient,
    private dialog: MatDialog,
    private translate: TranslateService,
    private appService: AppService,
    private cookieService: CookieService
  ) {
  }

  async setModules() {
    this.appService.manualLoading = true;

    await this.httpClient.get(`/api/features/get_modules`).pipe(
      map((response: ModuleModel) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    ).subscribe(res => {
      this.features = res;
      this.setLanguage();
    },
      () => {
        this.appService.serverFailed = true;
      });
  }

  checkIPhone() {
    if (
      navigator.userAgent.includes("iPhone") &&
      !localStorage.getItem('iPhoneGuide')
    ) {
      this.dialog.open(IphoneGuideDialogComponent, {
        width: '25rem',
        maxWidth: '100%'
      }).afterClosed().subscribe(() => {
        localStorage.setItem('iPhoneGuide', '1')
      });
    }
  }

  setLanguage() {
    this.translate.addLangs(['en', 'fa', 'es']);
    if (this.lang) {
      this.translate.setDefaultLang(this.lang);
      document.documentElement.setAttribute("lang", this.lang);
    }
    this.appService.manualLoading = false;
    this.checkIPhone();
  }

  get theme(): number {
    return this.features.THEME
    // return 630
  }

  get primaryColor(): string {
    return this.features.COLOR?.toString()
  }

  get accentColor(): string {
    return this.features.ACCENT_COLOR?.toString()
  }

  get guild_id(): number {
    return this.features.GUILD_CATEGORY_ID
  }

  get lang(): string {
    if (this.isMultipleLang) {
      return this.cookieService.getCookie('lang') || 'fa'
    }
    return <string>this.features.LANG || 'fa'
  }

  set lang(language: string) {
    this.cookieService.setCookie('lang', language, 365);
    this.appService.refresh()
  }

  get isMultipleLang(): boolean {
    return Array.isArray(this.features.LANG) && this.features.LANG.length > 1;
  }

  get allLanguages(): string[] {
    if (Array.isArray(this.features.LANG)) {
      return this.features.LANG
    } else {
      return []
    }
  }

  get font(): string {
    return this.features.FONT
  }

  get isRenovation(): boolean {
    return this.theme == 500
  }

  get isFreeTry(): boolean {
    return environment.API_URL.includes('samplesiteesho');
  }

  ///////// modules services ////////////////

  get secondCart(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => x.ID === modulesIDs.notebook) !== -1;
    } else {
      return false;
    }
  }

  get payWithCheque(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => x.ID === modulesIDs.cheque) !== -1;
    }
    return false;
  }

  get wallet(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => x.ID === modulesIDs.wallet) !== -1;
    }
    return false;
  }

  get replaceModule(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => x.ID === modulesIDs.replaceModule) !== -1;
    }
    return false;
  }

  get idPayGatewayModule(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.idPay) !== -1;
    }
    return false;
  }

  get sabinGatewayModule(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.sabin) !== -1;
    }
    return false;
  }

  get zarinpalGateway(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.zarinpal) !== -1;
    }
    return false;
  }

  get noSignUpModule(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.noSignUp) !== -1;
    }
    return false;
  }

  get luckyWheel(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.luckyWheel) !== -1;
    }
    return false;
  }

  get rankPoint(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.rankPoint) !== -1;
    }
    return false;
  }

  get digiKala(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.digiKala) !== -1;
    }
    return false;
  }

  get aparat(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.aparat) !== -1;
    }
    return false;
  }

  get pastime(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.pastime) !== -1;
    }
    return false;
  }

  get popUp(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.popUp) !== -1;
    }
    return false;
  }

  get customDelivery(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.customDelivery) !== -1;
    }
    return false;
  }

  get hideFactorOrderDate(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      return this.features.getModules.findIndex(x => +x.ID === modulesIDs.hideFactorOrderDate) !== -1;
    }
    return false;
  }

  get twoPhasePay(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.twoPhasePay);
      return index !== -1;
    }
    return false;
  }

  get tax(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.tax);
      return index !== -1;
    }
    return false;
  }

  get consult(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.consult);
      return index !== -1;
    }
    return false;
  }

  get torob(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.torob);
      return index !== -1;
    }
    return false;
  }

  get payOnSpot(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.payOnSpot);
      return index !== -1;
    }
    return false;
  }

  get onlyOTP(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.onlyOTP);
      return index !== -1;
    }
    return false;
  }

  get payByPOS(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.payByPOS);
      return index !== -1;
    }
    return false;
  }

  get orderComment(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.orderComment);
      return index !== -1;
    }
    return false;
  }

  get expressReceive(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.expressReceive);
      return index !== -1;
    }
    return false;
  }

  get originalProduct(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.original);
      return index !== -1;
    }
    return false;
  }

  get returnGuarantee(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.returnGuarantee);
      return index !== -1;
    }
    return false;
  }

  get fullTimeSupport(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.fullTimeSupport);
      return index !== -1;
    }
    return false;
  }

  get hasApplication(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.hasApplication);
      return index !== -1;
    }
    return false;
  }

  get minimumOrderProduct(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.minimumOrderProduct);
      return index !== -1;
    }
    return false;
  }

  get productComments(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.productComments);
      return index !== -1;
    }
    return false;
  }

  get hasBlog(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.blog);
      return index !== -1;
    }
    return false;
  }

  get hasNews(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.news);
      return index !== -1;
    }
    return false;
  }

  get ourServices(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.ourServices);
      return index !== -1;
    }
    return false;
  }

  get landingCategorySetting(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.landingCategorySetting);
      return index !== -1;
    }
    return false;
  }

  get whatsAppBtn(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.whatsAppBtn);
      return index !== -1;
    }
    return false;
  }

  get miniContactUs(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.miniContactUs);
      return index !== -1;
    }
    return false;
  }

  get goftino(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.goftino);
      return index !== -1;
    }
    return false;
  }

  get courierMaximumSupport(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.courierMaximumSupport);
      return index !== -1;
    }
    return false;
  }

  get SEO(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.SEO);
      return index !== -1;
    }
    return false;
  }

  get googleTagManager(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.googleTagManager);
      return index !== -1;
    }
    return false;
  }

  get googleAnalytics(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.googleAnalytics);
      return index !== -1;
    }
    return false;
  }

  get googleSearchConsole(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.googleSearchConsole);
      return index !== -1;
    }
    return false;
  }

  get clarity(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.clarity);
      return index !== -1;
    }
    return false;
  }

  get yektanet(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.yektanet);
      return index !== -1;
    }
    return false;
  }

  get productInputCounter(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.productInputCounter);
      return index !== -1;
    }
    return false;
  }

  get siteeshoLicense(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.siteeshoLicense);
      return index !== -1;
    }
    return false;
  }

  get noOTP(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.noOTP);
      return index !== -1;
    }
    return false;
  }

  get noReferralCode(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.noReferralCode);
      return index !== -1;
    }
    return false;
  }

  get categoriesDrawer(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.categoriesDrawer);
      return index !== -1;
    }
    return false;
  }

  get disableMapLocation(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.disableMapLocation);
      return index !== -1;
    }
    return false;
  }

  get noAuthenticate(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.noAuthenticate);
      return index !== -1;
    }
    return false;
  }

  get postalCode(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.postalCode);
      return index !== -1;
    }
    return false;
  }

  get rial(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.rial);
      return this.isShahrema || index !== -1;
    }
    return false;
  }

  get quiz(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.quiz);
      return this.isShahrema || index !== -1;
    }
    return false;
  }

  get loginWithEmailPhone(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.loginWithEmailPhone);
      return this.isShahrema || index !== -1;
    }
    return false;
  }

  get customerCounter(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.customerCounter);
      return index !== -1;
    }
    return false;
  }

  get video(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.video);
      return index !== -1;
    }
    return false;
  }

  get paypalGateway(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.paypalGateway);
      return index !== -1;
    }
    return false;
  }

  get isInfoBase(): boolean {
    if (this.features.getModules && this.features.getModules.length) {
      const index = this.features.getModules.findIndex(x => +x.ID === modulesIDs.infoBase);
      return index !== -1;
    }
    return false;
  }

  get isWegal(): boolean {
    return environment.API_URL.includes('wegalfars')
  }

  get isBazargardon(): boolean {
    return environment.API_URL.includes('bazargardon')
  }

  get isMotolead(): boolean {
    return environment.API_URL.includes('motolead') || environment.API_URL.includes('192685')
  }

  get isShahrema(): boolean {
    return environment.API_URL.includes('fr2fr')
  }

  get isMezon8(): boolean {
    return environment.API_URL.includes('mezon8')
  }

  get isKijaFood(): boolean {
    return environment.API_URL.includes('kijafood')
  }

  get isMyFarmasiIran(): boolean {
    return environment.API_URL.includes('myfarmasiiran')
  }

  get isApadanaComputer(): boolean {
    return environment.API_URL.includes('apadanacomputer')
  }

  get isSpora(): boolean {
    return environment.API_URL.includes('spora')
  }

  get isMelinamadah(): boolean {
    return environment.API_URL.includes('melinamadah')
  }

  get isLebasbardary(): boolean {
    return environment.API_URL.includes('lebasbardary')
  }

  get isBardariSoltani(): boolean {
    return environment.API_URL.includes('lebasbardarisoltani')
  }

  get isSampleSiteesho(): boolean {
    return environment.API_URL == 'https://samplesiteesho.ir';
  }

}
