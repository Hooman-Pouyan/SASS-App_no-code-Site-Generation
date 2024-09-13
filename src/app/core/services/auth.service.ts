import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { UserLoginModel } from "@app/core/models/credentials.model";
import {p2e} from "@app/modules/global/functions";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  login(username: string, password: string) {

    const body = {
      USER_NAME: p2e(username),
      PASSWORD: p2e(password),
      VERSION: '0',
      VERSION_TYPE: '2'
    }

    return this.httpClient.post("/api/auth/local", body).pipe(
      map((response: UserLoginModel) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  signUp(data) {
    return this.httpClient.put('/api/users/guest', data).pipe(
      map((response: UserLoginModel) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  checkToken() {
    return this.httpClient.get("/api/users/CheckToken").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  registerGuest(data) {
    return this.httpClient.post("/api/users/guest", data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  reSendVerifyCode(username) {
    return this.httpClient.get(`/api/users/otp/${p2e(username)}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  resetPass(username, otp, password, userId) {

    const data = {
      USER_NAME: p2e(username),
      OTP: otp,
      PASSWORD: p2e(password),
      USER_ID: userId
    }

    return this.httpClient.put('/api/users/resetPassword', data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  verifyOtp(username, otp, userId?) {
    const data: any = {
      USER_NAME: p2e(username),
      OTP: p2e(otp)
    }

    if (userId) {
      data.USER_ID = userId;
    }

    return this.httpClient.put('/api/users/verify', data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  SignWithGoogle(email, name, avatar, userId) {

    const data = {
      NAME: name,
      EMAIL: email,
      AVATAR: avatar,
      USER_ID: userId
    }

    return this.httpClient.post('/api/auth/local/checkEmail', data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getCreateOtpCode(phoneNumber) {
    const data = {
      USER_NAME: p2e(phoneNumber),
    }

    return this.httpClient.put('/api/users/usercreateotp', data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  SignUpWithEmail(data) {
    return this.httpClient.post('/api/auth/local/checkEmail', data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  confirmOtpEmail(email, otp) {
    return this.httpClient.post(`/api/users/verify/${email}/${otp}`, {}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  checkUserSignedUp(username) {

    const _data = {
      USER_NAME: p2e(username),
    }

    return this.httpClient.put('/api/users/CheckUser', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  confirmReferralCode(referralCode) {
    const _data: any = {
      REFERRAL_CODE: referralCode
    }
    return this.httpClient.post('/api/users/ReferralCode', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOtpCode(userGuestName, userId, secondUserName) {
    const _data: any = {
      USER_NAME: p2e(userGuestName),
      USER_ID: userId,
      SECOND_USER_NAME: p2e(secondUserName)
    }
    return this.httpClient.put('/api/users/userotp', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
