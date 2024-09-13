import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getFavourite() {
    return this.httpClient.get("/api/users/getLike").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  addFavourite(productId: number) {
    const data = {
      PRODUCT_ID: productId
    }

    return this.httpClient.post("/api/users/Like", data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteFavourite(productId) {
    return this.httpClient.delete(`/api/users/Unlike/${productId}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
