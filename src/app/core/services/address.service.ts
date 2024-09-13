import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {AddressModel} from "@app/core/models/address.model";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getAddressUser() {
    return this.httpClient.get("/api/users/address").pipe(
      map((response: AddressModel[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteAddress(ID) {
    return this.httpClient.delete(`/api/users/address/${ID}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  addAddress(address: AddressModel) {
    return this.httpClient.post('/api/users/address', address).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  editAddress(address: AddressModel) {
    return this.httpClient.put(`/api/users/address/${address.ID}`, address).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  changeCurrentAddress(address: AddressModel) {

    address.SELECTED = 1

    return this.httpClient.put(`/api/users/address/${address.ID}`, address).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  changeOrderAddress(orderId: number) {
    const _data = {
      ORDER: [orderId]
    }

    return this.httpClient.put("/api/order/ChangeAddress", _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
