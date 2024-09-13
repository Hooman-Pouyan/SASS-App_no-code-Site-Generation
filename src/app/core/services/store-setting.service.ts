import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {BannerType, StoreModel} from "@app/core/models/store.model";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {environment} from "@env/environment";
import {SEOModel} from "@app/core/models/global.model";
import {ModulesService} from "@app/core/services/modules.service";

@Injectable({
  providedIn: 'root'
})
export class StoreSettingService {

  private _store = {} as StoreModel;

  constructor(
    private httpClient: HttpClient,
    private modulesService: ModulesService,
  ) {
  }

  // functions

  set store(store: StoreModel) {
    this._store = store
  }

  get store(): StoreModel {
    return this._store
  }

  set id(id: number) {
    this._store.id = id
    localStorage.removeItem('storeId')
  }

  set appSectionImage(appSectionImage: string) {
    this.store.appSectionImage = environment.ADMIN_API_URL + appSectionImage
  }

  set motto(motto: string) {
    this.store.motto = motto
  }

  set desktopBanner(desktopBanner: string) {
    this.store.desktopBanner = environment.ADMIN_API_URL + '/assets/img/stores/' + desktopBanner
  }

  set mobileBanner(mobileBanner: string) {
    this.store.mobileBanner = environment.ADMIN_API_URL + '/assets/img/stores/' + mobileBanner
  }

  set guaranteePrice(guaranteePrice: number) {
    this.store.guaranteePrice = guaranteePrice
  }

  get storeCurrency(): string {
    if (this.modulesService.rial) {
      return 'ريال'
    } else {
      return 'تومان'
    }
  }

  // http services

  getStoreId() {
    return this.httpClient.get(`/api/stores/sitisho/getByDomain/'${environment.API_URL.replace('https://', '')}'`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getWorkHour() {
    return this.httpClient.get(`/api/stores/${this.store.id}/settings/workHours`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getStoreSetting() {
    return this.httpClient.get(`/api/landing/get_setting/${this.store.id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getStoreContactUs() {
    return this.httpClient.get(`/api/setting/${this.store.id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getBanners(bannerType: BannerType) {
    return this.httpClient.get(`/api/landing/get_image_slider/${this.store.id}/${bannerType}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getSeoData() {
    return this.httpClient.get(`/api/stores/seo`).pipe(
      map((response: { data: SEOModel[] }) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


}
