import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';
import { Router } from '@angular/router';
import { LawsComponent } from 'src/app/modules/pages/laws/laws.component';
import { ModulesService } from "@app/core/services/modules.service";
import { NotificationService } from "@app/core/services/notification.service";
import { CredentialsService } from "@app/core/services/credentials.service";
import {checkPasswordConfirm, p2e} from "@app/modules/global/functions";

@Component({
  selector: 'register-phone',
  templateUrl: './register-phone.component.html',
  styleUrls: ['./register-phone.component.scss'],
})
export class RegisterPhoneComponent implements OnInit {

  signUpForm: FormGroup;
  signUpStatus: 'form' | 'otp' = 'form';
  otpTimer: number = 120;
  otpCode: number;

  constructor(
    private formBuilder: FormBuilder,
    public modulesService: ModulesService,
    private credentialService: CredentialsService,
    private authService: AuthService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.formBuilder.group({
      USER_NAME: ['', [Validators.required]],
      NAME: ['', Validators.required],
      PASSWORD: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
      REFERRAL_CODE: [undefined],
      wantPassword: [!this.modulesService.onlyOTP],
      OTP: [0],
      PASTIME: [''],
      NATIONAL_CODE: [''],
      USER_ID: [this.credentialService.credentials.ID],
      rules: [false, Validators.requiredTrue],
      isGuest: [1]
    });

    checkPasswordConfirm(this.signUpForm, 'PASSWORD', 'passwordConfirm')

    this.checkWantPassword(this.signUpForm.value.wantPassword)

    this.signUpForm.controls['wantPassword'].valueChanges.subscribe(wantPassword => {
      this.checkWantPassword(wantPassword)
    })
  }

  checkWantPassword(wantPassword: boolean): void {
    if (wantPassword == false) {
      this.signUpForm.controls['PASSWORD'].setValidators([])
      this.signUpForm.controls['passwordConfirm'].setValidators([])
      this.signUpForm.controls['PASSWORD'].updateValueAndValidity()
      this.signUpForm.controls['passwordConfirm'].updateValueAndValidity()
      this.signUpForm.controls['OTP'].setValue(1)
    } else if (wantPassword == true) {
      this.signUpForm.controls['PASSWORD'].setValidators(Validators.required)
      this.signUpForm.controls['passwordConfirm'].setValidators(Validators.required)
      this.signUpForm.controls['PASSWORD'].updateValueAndValidity()
      this.signUpForm.controls['passwordConfirm'].updateValueAndValidity()
      this.signUpForm.controls['OTP'].setValue(0)
    }
  }

  openLawsDialog() {
    this.dialog.open(LawsComponent, {
      width: '60rem',
      maxWidth: '100%'
    });
  }

  async confirmReferralCode(): Promise<number> {
    return await this.authService.confirmReferralCode(this.signUpForm.value['referralCode']).toPromise()
  }

  async userSignedUpCheck(): Promise<any> {
    return await this.authService.checkUserSignedUp(this.signUpForm.value['USER_NAME']).toPromise()
  }

  timerFunc() {
    setTimeout(() => {
      if (this.otpTimer > 0) {
        this.otpTimer -= 1;
        this.timerFunc();
      } else {
        this.otpTimer = 0;
      }
    }, 1000)
  }

  getOtpCode() {
    this.signUpStatus = 'otp'
    if(this.signUpForm.value['USER_NAME'].includes('@')){
      this.otpTimer = 600;
      debugger
    }
    else{
      this.otpTimer = 120;
      debugger
    }
    this.timerFunc();

    this.authService.getOtpCode(
      this.credentialService.credentials.USER_NAME,
      this.credentialService.credentials.ID,
      this.signUpForm.value['USER_NAME']
    ).subscribe(() => {
    });
  }

  submitForm(): void {
    this.userSignedUpCheck().then(
      () => {
        this.router.navigate(['/auth']).then(() =>
          this.notificationService.error('شماره تلفن از قبل وجود دارد!')
        );
      },
      () => {
        if (this.signUpForm.value['referralCode']) {
          this.confirmReferralCode().then(status => {
            if (status == 200) {
              if (this.modulesService.noAuthenticate) {
                this.signUp();
              } else {
                this.getOtpCode();
              }
            } else {
              this.notificationService.error('کد معرف وارد شده تایید نشده است!')
            }
          })
        }
        else {
          if (this.modulesService.noAuthenticate) {
            this.signUp();
          } else {
            this.getOtpCode();
          }
        }
      }
    )
  }

  async verifyOtp(): Promise<any> {
    return await this.authService.verifyOtp(
      this.signUpForm.value['USER_NAME'],
      this.otpCode.toString(),
      this.credentialService.credentials.ID,
    ).toPromise()
  }

  submitOtp(): void {
    this.verifyOtp().then(status => {
      if (status?.CODE == 200) {
        this.signUp()
      } else {
        this.notificationService.error('کد نامعتبر است!')
      }
    })
  }

  signUp(): void {
    let password: string = this.signUpForm.controls['PASSWORD'].value

    if (this.signUpForm.value.wantPassword == false) {
      this.signUpForm.controls['PASSWORD'].setValue(this.otpCode)
      password = this.signUpForm.controls['USER_NAME'].value + this.otpCode
    }

    this.signUpForm.controls['USER_NAME'].setValue(p2e(this.signUpForm.controls['USER_NAME'].value))
    this.signUpForm.controls['PASSWORD'].setValue(p2e(this.signUpForm.controls['PASSWORD'].value))
    this.signUpForm.controls['passwordConfirm'].setValue(p2e(this.signUpForm.controls['passwordConfirm'].value))


    this.authService.signUp(this.signUpForm.value).subscribe(
      () => {
        this.credentialService.login(this.signUpForm.controls['USER_NAME'].value, password)
      },
      () => {
        this.router.navigate(['/']).then(() => {
          this.notificationService.error('متاسفانه خطایی رخ داده است. لطفا برای ادامه ی خرید با شماره تلفنی که ثبت کردید وارد سایت شوید!')
        })
      }
    )
  }


}
