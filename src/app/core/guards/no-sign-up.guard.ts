import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {ModulesService} from "../services/modules.service";
import {NotificationService} from "@app/core/services/notification.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from "@app/core/services/credentials.service";

@Injectable({
  providedIn: 'root'
})
export class NoSignUpGuard implements CanActivate {

  constructor(
    private modulesService: ModulesService,
    private notificationService: NotificationService,
    private storeSettingService: StoreSettingService,
    private credentialService: CredentialsService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.modulesService.noSignUpModule && !this.credentialService.isAuthenticated) {
      if (state.url.indexOf('register-user') != -1) {
        this.notificationService.warning('برای ثبت نام با شماره تلفن' + this.storeSettingService.store.phone + 'تماس بگیرید،', 'متوجه شدم')
      } else {
        this.notificationService.error('ابتدا باید وارد حساب کاربری خود شوید')
      }
      return false
    } else {
      return true
    }
  }

}
