import {Component, OnInit} from '@angular/core';
import {environment} from "@env/environment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {AppService} from "@app/core/services/app.service";
import {AuthService} from "@app/core/services/auth.service";
import {Router} from "@angular/router";
import {LawsComponent} from "../../../pages/laws/laws.component";
import {NotificationService} from "@app/core/services/notification.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {checkPasswordConfirm} from "@app/modules/global/functions";

@Component({
  selector: 'register-renovation',
  templateUrl: './register-renovation.component.html',
  styleUrls: [
    './register-renovation.component.scss'
  ]
})
export class RegisterRenovationComponent implements OnInit {

  imageUrlDevelop = environment.ADMIN_API_URL;
  storeId = localStorage.getItem('storeId');
  storeLogo = localStorage.getItem('siteLogo');

  form: FormGroup;
  step: 'dataStep' | 'otpStep' = "dataStep";
  termCondition: boolean = false;


  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private credentialsService: CredentialsService,
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      EMAIL: ['', [Validators.required, Validators.email]],
      NAME: ['', [Validators.required]],
      PASSWORD: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
      USER_ID: [''],
      LOGIN_WITH_EMAIL: ['1'],
      OTP: ['']
    });
    checkPasswordConfirm(this.form, 'PASSWORD', 'passwordConfirm')
  }

  confirmData() {

    if (!this.termCondition) {
      this.notificationService.error("you must accept the terms and conditions")
      return;
    }

    if (this.step === 'dataStep') {
      if (this.form.get('EMAIL').errors?.required) {
        this.notificationService.error("لطفا ایمیل را وارد کنید");
        return
      } else if (this.form.get('EMAIL').errors?.email) {
        this.notificationService.error("لطفا ایمیل معتبر وارد کنید");
        return
      } else if (this.form.get('NAME').errors?.required) {
        this.notificationService.error("لطفا نام را وارد کنید");
        return
      } else if (this.form.get('PASSWORD').errors?.required) {
        this.notificationService.error("لطفا کلمه عبور را وارد کنید");
        return
      } else if (this.form.get('PASSWORD').value !== this.form.get('passwordConfirm').value) {
        this.notificationService.error("کلمه‌ی عبور و تکرار کلمه ی عبور یکسان نمی باشد");
        return
      }
    }

    if (this.step === 'otpStep') {
      if (this.form.get('OTP').errors?.required) {
        this.notificationService.error("لطفا کد تایید را وارد کنید");
        return
      }
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched()
    } else {
      this.authService.checkUserSignedUp(this.form.value.EMAIL).subscribe(
        res => {
          if (res) {
            this.router.navigate(['/auth']).then(() =>
              this.notificationService.warning('Email already exists!', '', 3000)
            );
          } else {
            this.authService.SignUpWithEmail(this.form.value).subscribe(() => {
              this.step = "otpStep"
            })
          }
        },
        () => {
          this.authService.SignUpWithEmail(this.form.value).subscribe(() => {
            this.step = "otpStep"
          })
        }
      )

    }
  }

  getOtpCode() {
    this.authService.reSendVerifyCode(this.form.value.EMAIL).subscribe(() => {
    });
  }

  verifyOtp() {
    this.authService.confirmOtpEmail(this.form.value.EMAIL, this.form.value.OTP).subscribe(
      res => {
        if (res) {
          this.login()
        } else {
          this.notificationService.error('کد نامعتبر است!');
        }
      },
      () => {
        this.notificationService.error('کد نامعتبر است!');
      }
    )
  }

  login() {
    this.credentialsService.login(this.form.value.EMAIL, this.form.value.PASSWORD)
  }

  openLawsDialog() {
    this.dialog.open(LawsComponent, {
      width: '60rem',
      maxWidth: '100%'
    });
  }

}
