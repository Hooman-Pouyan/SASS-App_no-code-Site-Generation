import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {CredentialsService} from "@app/core/services/credentials.service";
import {NotificationService} from "@app/core/services/notification.service";
import {AppService} from '../services/app.service';

/**
 * @description
 * This Guard use for check user is login or not
 * .if not login redirect to login page.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private credentialsService: CredentialsService,
    private notificationService: NotificationService,
    private appService: AppService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.credentialsService.isAuthenticated && !this.credentialsService.isGuest) {
      return true
    } else {
      this.appService.fromFactor = state.url.includes("factor");
      this.router.navigate(['/auth']).then(() => {
        this.notificationService.warning('ابتدا وارد حساب کاربری خود شوید', undefined, 3500)
      })
      return false
    }

  }
}
