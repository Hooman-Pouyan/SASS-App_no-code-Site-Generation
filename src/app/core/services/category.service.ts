import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from "rxjs/operators";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CategoryModel} from "@app/core/models/category.model";
import {ProductsFilter, ProductSliderModel, ProductSpecifications} from "@app/core/models/product.model";
import {PaginationModel} from "@app/core/models/global.model";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private httpClient: HttpClient,
    private storeSettingService: StoreSettingService
  ) {
  }

  getProductsByCategoryId(
    id,
    limit?: number,
    sortBy?: ProductsFilter,
    brands?: number[],
    priceFilter?: number[],
    sizes?: string[],
    colors?: string[],
    featureFilters?: {key: string, values: string[]}[],
    page: number = 1
  ) {

    let _data: {
      PRODUCT_BRAND_ID?: number[],
      SIZE?: string[],
      COLOR?: string[]
    } = {}

    if (brands?.length) {
      _data.PRODUCT_BRAND_ID = brands
    }

    if (sizes?.length) {
      _data.SIZE = sizes
    }

    if (colors?.length) {
      _data.COLOR = colors
    }

    let params = new HttpParams()

    params = params.set('page', page.toString())

    if (limit) {
      params = params.set('limit', limit.toString())
    }

    if (sortBy) {
      params = params.set('sort', sortBy.toString())
    }

    if (featureFilters && featureFilters?.length) {
      params = params.set('filter', JSON.stringify(featureFilters))
    }

    return this.httpClient.post(`/api/landing/product_slider/${id}`, _data, {params}).pipe(
      map((response: {
        DATA: ProductSliderModel[],
        PAGINATION: PaginationModel
      }) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getSubCategoryForLandingPage() {
    return this.httpClient.get(`/api/landing/getsubcategory`).pipe(
      map((response: any[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getParentCategories() {
    return this.httpClient.get(`/api/stores/child-first/${this.storeSettingService.store.id}`).pipe(
      map((response: CategoryModel[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getSubCategories(categoryId: number) {
    return this.httpClient.get(`/api/stores/${this.storeSettingService.store.id}/levelproduct/${categoryId}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getCategoryDetail(categoryID: number) {
    return this.httpClient.get(`/api/products/PrductDetail/${categoryID}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getSection(){
    return this.httpClient.get(`/api/landing/Section`).pipe(
      map((response: any[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getCategorySpecifications(categoryID?: number, showInFilter?: 0 | 1, showInCompare?: 0 | 1) {

    let query: HttpParams = new HttpParams()

    if (categoryID && categoryID != 1) {
      query = query.append('ID', categoryID.toString())
    }

    if (showInFilter == 1) {
      query = query.append('SHOW_IN_FILTER', showInFilter.toString())
    }

    if (showInCompare == 1) {
      query = query.append('SHOW_IN_COMPARE', showInCompare.toString())
    }

    return this.httpClient.get(`/api/features/v2`, {params: query}).pipe(
      map((response: ProductSpecifications[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
