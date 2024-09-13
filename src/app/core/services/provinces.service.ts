import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {CityModel, ProvinceModel} from "@app/core/models/address.model";


@Injectable({
  providedIn: 'root'
})
export class ProvincesService {

  constructor(private httpClient: HttpClient) { }

  getAllProvinces() {
    return this.httpClient.get('/api/provinces').pipe(
      map((response: ProvinceModel[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getAllCityOfProvince(provinceId: number) {
    return this.httpClient.get(`/api/provinces/${provinceId}/cities`).pipe(
      map((response: CityModel[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getAddressFromMark(address: string, lat: string, lng: string) {

    let params = new HttpParams()
      .set('term', address)
      .set('lat', lat)
      .set('lng', lng)

    return this.httpClient.get('/api/stores/filter/aroundlocations', {params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


}
