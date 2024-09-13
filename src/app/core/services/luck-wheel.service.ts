import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LuckWheelService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getWheelItems() {
    return this.httpClient.get('/api/luck-wheel/getGifts').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOtp(phoneNumber) {
    return this.httpClient.post(`/api/luck-wheel/otp/${phoneNumber}`, {}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  verifyOtp(phoneNumber, otpCode) {
    return this.httpClient.post(`/api/luck-wheel/verify/${phoneNumber}/${otpCode}`, {}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  submitPrize(phoneNumber, prizeId) {

    const data = {
      USER_NAME: phoneNumber,
      LUCK_WHEEL_ID: prizeId
    }

    return this.httpClient.post('/api/luck-wheel/userGetGift', data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
