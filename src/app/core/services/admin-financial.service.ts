import {Injectable} from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class TurnoverService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  getTurnOverNew(urId, turnOverId, storeId, status) {
    return this.httpClient.get(`/api/turnover/newTurnover/${urId}/${turnOverId}/${storeId}/${status}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


}

