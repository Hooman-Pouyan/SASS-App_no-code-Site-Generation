import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@env/environment';
import {AppService} from "@app/core/services/app.service";
import {ModulesService} from "@app/core/services/modules.service";

@Injectable({
  providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {

  constructor(
    private appService: AppService,
    private injector: Injector
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url) && !request.url.includes('i18n') && !request.url.includes('json') ) {
      request = request.clone({url: environment.API_URL + request.url});
    }

    if (this.injector.get(ModulesService).lang != 'fa') {
      request = request.clone({
        params: request.params.append('lang', this.injector.get(ModulesService).lang)
      })
    }

    if (
      request.method == 'POST' || request.method == 'PUT' || request.method == 'DELETE'
    ) {
      this.appService.loading = true
    }
    return next.handle(request);
  }
}
