import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "@env/environment";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { AppService } from "@app/core/services/app.service";
import { AuthService } from "@app/core/services/auth.service";
import { LawsComponent } from "../../../pages/laws/laws.component";
import { NotificationService } from "@app/core/services/notification.service";
import { CredentialsService } from "@app/core/services/credentials.service";
import { checkPasswordConfirm } from "@app/modules/global/functions";
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'register-email',
  templateUrl: './register-email.component.html',
  styleUrls: [
    './register-email.component.scss'
  ],
})
export class RegisterEmailComponent implements OnInit {

  imageUrlDevelop = environment.ADMIN_API_URL;
  storeId = localStorage.getItem('storeId');
  storeLogo = localStorage.getItem('siteLogo');

  form: FormGroup;
  step: 'dataStep' | 'otpStep' = "dataStep";
  termCondition: boolean = false;
  mainStoreSetting: any = null;
  otpTimer: number = 120;
  verifyOtpStatus: boolean = true;
  otpCode: number;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private appService: AppService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private credentialsService: CredentialsService,
    private router: Router,
    public modulesService : ModulesService
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
    if (this.form.invalid) {
      this.form.markAllAsTouched()
    } else {
      this.authService.checkUserSignedUp(this.form.value.EMAIL).subscribe(
        () => {
          this.router.navigate(['/auth']).then(() =>
            this.notificationService.valid('ایمیل از قبل وجود دارد!', '', 3000)
          );
        },
        () => {
          this.authService.SignUpWithEmail(this.form.value).subscribe(() => {
            this.timerFunc();
            this.step = "otpStep"
          })
        }
      )

    }
  }

  getOtpCode() {
    this.otpTimer = 120;
    this.timerFunc();
    this.authService.reSendVerifyCode(this.form.value.EMAIL).subscribe(() => {
    });
  }

  verifyOtp() {
    this.authService.confirmOtpEmail(this.form.value.EMAIL, this.otpCode).subscribe(
      res => {
        if (res) {
          this.credentialsService.login(this.form.value.EMAIL, this.form.value.PASSWORD)
        } else {
          this.notificationService.error('کد نامعتبر است!');
        }
      },
      () => {
        this.notificationService.error('کد نامعتبر است!');
      }
    )
  }

  openLawsDialog() {
    this.dialog.open(LawsComponent, {
      width: '60rem',
      maxWidth: '100%'
    });
  }

  timerFunc() {
    setTimeout(() => {
      if (this.otpTimer > 0) {
        this.otpTimer -= 1;
        this.verifyOtpStatus = true;
        this.timerFunc();
      } else {
        this.otpTimer = 0;
        this.verifyOtpStatus = false;
      }
    }, 1000)
  }

}
