import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {CredentialsService} from "@app/core/services/credentials.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuestService {

  constructor(
    private authService: AuthService,
    private credentialsService: CredentialsService,
  ) {
  }

  signUpGuest() {
    // const username = "09" + randomUniqueNum(12, 12).join('');
    const username = "09" + Date.now().toString();
    const _data = {
      NAME: 'کاربر میهمان',
      USER_NAME: username,
      PASSWORD: '123456',
      OTP: 0
    };

    this.authService.registerGuest(_data).subscribe(
      user => {
        if (user) {
          this.authService.login(user.USER_NAME, _data.PASSWORD).subscribe(credentials => {
            this.credentialsService.credentials = credentials
          })
        }
      },
      error => {
        if (error.status == 400) {
          this.signUpGuest()
        }
      }
    )
  }

}
