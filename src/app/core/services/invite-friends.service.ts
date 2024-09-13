import {Injectable} from '@angular/core';
import {AppService} from './app.service';
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class inviteFriendsService {
  constructor(
    private httpClient: HttpClient
  ) {
  }

  getCode() {
    return this.httpClient.get("/api/users/getReferralCode").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  sendCode(user,code) {

    
    const data = {
      SEND_USER: user,
      REFERRAL_CODE:code
      }


    return this.httpClient.put("/api/users/sendReferralCode", data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
