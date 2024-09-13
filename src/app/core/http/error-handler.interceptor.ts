import {Injectable, Injector} from "@angular/core";
import {Observable} from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import {Logger} from "./logger.service";
import {environment} from '@env/environment';
import {AppService} from "@app/core/services/app.service";
import {ErrorMessage} from "@app/modules/global/error-message";
import {NotificationService} from "@app/core/services/notification.service";
import {UserGuestService} from "@app/core/services/user-guest.service";

const log = new Logger("ErrorHandlerInterceptor");

@Injectable({
  providedIn: "root"
})
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(
    private injector: Injector,
    private appService: AppService,
  ) {
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        tap(evt => {
          if (evt instanceof HttpResponse) {
            this.appService.loading = false;
          }
        }),
        catchError(error => this.errorHandler(error)));
  }

  private errorHandler(response: any): Observable<HttpEvent<any>> {
    this.appService.loading = false;
    if (!environment.production) {
      log.error("Request error", response);
    }
    if (
      !(response.url.includes('api/users/CheckToken')) &&
      !(response.url.includes('api/users/CheckUser')) &&
      !(response.url.includes('api/landing/sections')) &&
      !(response?.error?.message.includes('token')) &&
      !(response?.error?.message.includes('jwt'))
    ) {
      this.injector.get(NotificationService).error(ErrorMessage(response.error))
    }
    if (
      (response.url.includes('api/users/CheckToken')) &&
      (response.url.includes('api/users/CheckUser')) &&
      (response?.error?.message.includes('token')) &&
      (response?.error?.message.includes('jwt'))
    ) {
      this.injector.get(UserGuestService).signUpGuest()
    }
    throw response;
  }
}

