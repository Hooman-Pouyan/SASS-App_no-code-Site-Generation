import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {StoreSettingService} from './store-setting.service';

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  constructor(
    private httpClient: HttpClient,
    private storeSettingService: StoreSettingService
  ) {
  }

  search(search: string) {
    const str = search.split(" ").join("%");
    const strEncode = encodeURI(str);
    return this.httpClient.get(`/api/stores/filter/Search?q=${strEncode}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getProducts(categoryId) {
    return this.httpClient.get(`/api/stores/${this.storeSettingService.store.id}/Genelogyproduct/${categoryId}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getProductOfCategoryId(categoryId) {
    return this.httpClient.get(`/api/stores/${this.storeSettingService.store.id}/SortGenelogyproduct/${categoryId}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getCurrentStore() {
    return this.httpClient.get(`/api/stores/${this.storeSettingService.store.id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getProductBrands() {
    return this.httpClient.get(`/api/productBrands`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getFeaturesForFilter(categoryID: number = 1, itemsToSearch: string[]) {
    const _data = {
      ITEM: itemsToSearch
    }

    const query: HttpParams = new HttpParams().set('categoryId', categoryID.toString())

    return this.httpClient.post(`/api/features/getSizeAndColor`, _data, {params: query}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
