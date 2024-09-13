import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {environment} from "@env/environment";

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getCatalog() {
    return this.httpClient.get('/api/catalogs').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  createTicket(data) {
    return this.httpClient.post('/api/tickets/createTicket', data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getMainTickets(urID: number) {
    let params = new HttpParams()

    if (urID) {
      params = params.set('UR_ID', urID.toString())
    }

    return this.httpClient.get('/api/tickets/ParentTicket', {params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getTicketCatalog() {
    return this.httpClient.get('/api/catalogs').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getChildTickets(urID: number, ticketID: number) {
    const _data = {
      UR_ID: urID,
      TICKET_ID: ticketID
    }
    return this.httpClient.post('/api/tickets/getSendTicket', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  addNewTicket(formValue: any, ticketID: number, file: File = null) {
    const formData: FormData = new FormData();

    formData.append('FILE_NAME', file);
    if (ticketID != 0) {
      formData.append('TICKET_ID', ticketID.toString());
    }
    for (const key in formValue) {
      if (formValue.hasOwnProperty(key)) {
        if (formValue[key] || formValue[key] == 0) {
          formData.append(key, formValue[key]);
        }
      }
    }
    return this.httpClient.post(environment.ADMIN_API_URL + '/api/tickets/sendTicket', formData).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );

  }

}
