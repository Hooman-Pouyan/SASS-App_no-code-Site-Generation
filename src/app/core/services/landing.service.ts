import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {LandingModel} from "@app/core/models/landing.model";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";
import {environment} from "@env/environment";
import {ProductQ_A} from "@app/core/models/product.model"

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getLandingValue() {
    return this.httpClient.get('/api/landing/getlandingvalue').pipe(
      map((response: LandingModel[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getApprovedComments() {
    return this.httpClient.get('/api/features/getIdentifiedComment').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getMenuDetail() {
    return this.httpClient.get('/api/landing/mega-menu').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getCategoryBlog(type: number) {
    let params = new HttpParams()
      .set('type', type.toString())

    return this.httpClient.get('/api/general/File/categories', {params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  getGeneralAttributes(type: GeneralAttributeType, category?:string, search?:string) {
    let params = new HttpParams()

    if (category) {
      params = params.set('category', category)
    }

    if (search  ) {
      params = params.set('search', search)
    }

    return this.httpClient.get(`/api/general/File/${type}`, {params}).pipe(
      map((response: GeneralAttributeModel[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOneGeneralAttribute(type: GeneralAttributeType, id: number) {
    let params = new HttpParams()
      .set('ID', id.toString())

    return this.httpClient.get(`/api/general/File/${type}`, {params}).pipe(
      map((response: GeneralAttributeModel) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  AddRareProduct(body, image: File = null) {
    const formData: FormData = new FormData();
    for (const key in body) {
      if (body.hasOwnProperty(key)) {
        if (body[key] != null && body[key] != undefined) {
          formData.append(key, body[key]);
        }
      }
    }
    formData.append('IMAGE', image)
    return this.httpClient.post('/api/products/rareProduct', formData).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  setLandingValue(valueType: string, value: string) {
    const _data = {
      VALUE_TYPE: valueType,
      VALUE: value
    }

    return this.httpClient.post(`${environment.ADMIN_API_URL}/api/landing/setlandingvalue`, _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  setLandingImage(valueType: string, image: File) {
    const formData: FormData = new FormData();

    formData.append('VALUE_TYPE', valueType);
    formData.append('FILE', image);

    return this.httpClient.post(`${environment.ADMIN_API_URL}/api/landing/file`, formData).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  setLandingVideo(valueType: string, video: File) {
    const formData: FormData = new FormData();

    formData.append('VALUE_TYPE', valueType);
    formData.append('FILE', video);

    return this.httpClient.post(`${environment.ADMIN_API_URL}/api/landing/video`, formData).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getLandingSliders() {
    return this.httpClient.get('/api/landing/productSlider').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
