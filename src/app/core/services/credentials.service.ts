import {Injectable, Injector} from '@angular/core';
import {UserLoginModel, UserRoles} from "@app/core/models/credentials.model";
import {AuthService} from "@app/core/services/auth.service";
import {Router} from "@angular/router";
import {AppService} from "@app/core/services/app.service";
import {NotificationService} from "@app/core/services/notification.service";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {UserService} from "@app/core/services/user.service";
import {UserGuestService} from "@app/core/services/user-guest.service";
import {CartService} from "@app/core/services/cart.service";
import {forkJoin} from "rxjs";
import {ModulesService} from "@app/core/services/modules.service";
import {CookieService} from "@app/core/services/cookie.service";

@Injectable({
  providedIn: 'root'
})
export class CredentialsService {

  private credentialsKey = "_session";
  private _token: string;
  private _credentials: UserLoginModel;

  constructor(
    private authService: AuthService,
    private router: Router,
    private appService: AppService,
    private notificationService: NotificationService,
    private socialAuthService: SocialAuthService,
    private userService: UserService,
    private injector: Injector,
    private cartService: CartService,
    private modulesService: ModulesService,
    private cookieService: CookieService
  ) {
    const savedToken = this.cookieService.getCookie(this.credentialsKey);
    if (savedToken) {
      this.token = savedToken;
    }
  }

  set credentials(credentials: UserLoginModel) {
    this._credentials = credentials
    this.token = this._credentials.TOKEN
    if (!this.modulesService.isInfoBase) {
      this.cartService.updateCart();
      this.cartService.updateNotebook();
    }
    this.userService.getUserInformation().subscribe(userInformation => {
      this.userService.user = userInformation
    })
  }

  get credentials(): UserLoginModel {
    return this._credentials
  }

  set token(token: string) {
    this.cookieService.setCookie(this.credentialsKey, token)
    this._token = token
  }

  get token(): string {
    return this._token
  }

  get isAuthenticated(): boolean {
    return !!this._token;
  }

  get isGuest(): boolean {
    return this.credentials?.ROLE_ID == UserRoles.guest
  }

  get isAdmin(): boolean {
    return this.credentials?.ROLE_ID == UserRoles.admin
  }

  login(username: string, password: string): void {

    this.authService.login(username, password).subscribe(
      credit => {
        if (+credit.ROLE_ID === UserRoles.customer) {
          if (this.isGuest && !this.modulesService.isInfoBase) {
            forkJoin([
              this.userService.updateUserForAddresses(credit.USER_ROLE_ID, this.credentials.USER_ROLE_ID),
              this.userService.updateUserForOrders(credit.USER_ROLE_ID, this.credentials.USER_ROLE_ID),
            ]).subscribe(
              () => {
                this.credentials = credit
                this.routeAfterLogin();
              },
              () => {
                this.credentials = credit
                this.routeAfterLogin();
              },
            );
          } else {
            this.credentials = credit
            this.routeAfterLogin();
          }

        } else if (+credit.ROLE_ID === UserRoles.admin) {
          this.credentials = credit
          this.routeAfterLogin();
        }
        else {
          this.notificationService.error('فقط مشتری اجازه ی ورود دارد', undefined, 3500);
        }
      }
    );
  }

  logout(withNavigate: boolean = true): void {
    this.cookieService.deleteCookie(this.credentialsKey)
    localStorage.removeItem(this.credentialsKey);
    this._token = null;
    this._credentials = null;
    this.injector.get(UserGuestService).signUpGuest()
    if (withNavigate) {
      this.router.navigate(['/'])
    }
  }

  routeAfterLogin(): void {
    if (this.appService.fromFactor == true) {
      this.router.navigate(['/factor']).then(() => {
        this.appService.fromFactor = false
      });
    } else {
      this.router.navigate(['/']).then(() => {
      });
    }
  }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      this.authService.SignWithGoogle(res.email, res.name, res.photoUrl, this.credentials.ID).subscribe(
        () => {
          this.login(res.email, "123456");
        }
      );
    });
  }

}
