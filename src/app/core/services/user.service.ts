import {Injectable} from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {UserModel} from "@app/core/models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user = {} as UserModel;

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  // services

  set user(user: UserModel) {
    this._user = user
  }

  get user(): UserModel {
    return this._user
  }

  // http services

  getUserInformation() {
    return this.httpClient.get("/api/users/me").pipe(
      map((response: UserModel) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  userChangePassword(oldPass, newPass, confirmPass) {
    const body = {
      OLD_PASS: oldPass,
      NEW_PASS: newPass,
      CONFIRM_PASS: confirmPass
    }

    return this.httpClient.put("/api/users/password", body).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  userChangeInfo(name, email, pastime) {
    const body = {
      NAME: name,
      EMAIL: email,
      PASTIME: pastime
    }

    return this.httpClient.put("/api/users", body).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  getWallet(userRoleId: number) {
    return this.httpClient.get(`/api/wallet/${userRoleId}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateUserForOrders(customerId, userId) {
    const _data = {
      CUSTOMER_ID: customerId,
      UR_ID: userId
    }
    return this.httpClient.put(`/api/order/CustomerOrder`, _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  updateUserForAddresses(customerId, userId) {
    const _data = {
      CUSTOMER_ID: customerId,
      UR_ID: userId
    }
    return this.httpClient.put(`/api/order/CustomerAddress`, _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  consult(phoneNumber) {
    return this.httpClient.post(`/api/users/consult/${phoneNumber}`, {}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  setUserCategoryInfo(data) {
    return this.httpClient.put(`/api/users/setUserInfo`, {
      DATA : data
    }).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getUserCategoryInfo() {
    return this.httpClient.get(`/api/users/setUserInfo`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getUserClubDetail(data) {
    return this.httpClient.post(`/api/users/customer-club`, data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


}

