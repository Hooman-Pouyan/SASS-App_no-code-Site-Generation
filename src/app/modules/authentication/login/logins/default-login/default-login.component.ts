import {Component, OnInit} from '@angular/core';
import {environment} from "@env/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "@app/core/services/auth.service";
import {ModulesService} from "@app/core/services/modules.service";
import {ForgetPassComponent} from "../../components/forget-pass/forget-pass.component";
import {CredentialsService} from "@app/core/services/credentials.service";
import {NotificationService} from "@app/core/services/notification.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

@Component({
  selector: 'default-login',
  templateUrl: './default-login.component.html',
  styleUrls: [
    './default-login.component.scss',
  ],
})
export class DefaultLoginComponent implements OnInit {

  imageUrlDevelop = environment.ADMIN_API_URL;
  hidePassword = true;
  loginForm: FormGroup;
  pswType: 'psw' | 'otp' = 'psw';
  loginWithGoogle = () => this.credentialsService.loginWithGoogle()

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    public storeSettingService: StoreSettingService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.checkUsernameValidator();
    if (this.modulesService.onlyOTP) {
      this.changeOtpCheckbox(true)
    }
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: [null, Validators.required],
      otp: [''],
    })
  }

  checkUsernameValidator() {
    if (this.modulesService.lang == 'fa') {
      this.loginForm.controls['username'].setValidators([Validators.required]);
    } else {
      this.loginForm.controls['username'].setValidators([Validators.required, Validators.email]);
    }
  }

  openForgetPassDg() {
    this.dialog.open(ForgetPassComponent, {
      width: '400px',
      maxWidth: '100%',
    });
  }

  changeOtpCheckbox(checked: boolean) {
    if (checked) {
      this.pswType = 'otp';
      this.loginForm.controls['password'].setValidators([]);
      this.loginForm.controls['otp'].setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
    } else {
      this.pswType = 'psw';
      this.loginForm.controls['otp'].setValidators([]);
      this.loginForm.controls['password'].setValidators([Validators.required]);
    }
  }

  getOtpCode() {
    if (this.loginForm.get('username').invalid) {
      this.notificationService.error('تلفن همراه معتبر نمی باشد');
      return;
    }

    this.authService.getCreateOtpCode(this.loginForm.value.username).subscribe(() => {
    });
  }

  onSubmit() {
    const username = this.loginForm.controls.username.value

    if (this.pswType === 'otp') {
      const otp = this.loginForm.controls.otp.value

      this.authService.verifyOtp(username, otp).subscribe(
        res => {
          if (res) {
            const password = this.loginForm.controls.username.value + otp;
            this.credentialsService.login(this.loginForm.controls.username.value, password);
          } else {
            this.notificationService.error('کلمه عبور یکبار مصرف شما معتبر نمی باشد، لطفا دوباره تلاش کنید!');
          }
        },
        () => {
          this.notificationService.error('متأسفانه خطایی رخ داده است، لطفا مجددا تلاش کنید!');
        }
      );
    } else if (this.pswType === 'psw') {
      this.credentialsService.login(username, this.loginForm.controls.password.value);
    }
  }
}

