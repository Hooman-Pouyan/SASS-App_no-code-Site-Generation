import {Component, OnChanges, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {AuthService} from 'src/app/core/services/auth.service';
import {ModulesService} from 'src/app/core/services/modules.service';
import {NotificationService} from "@app/core/services/notification.service";

@Component({
  selector: 'mk-forget-pass',
  templateUrl: './forget-pass.component.html',
  styleUrls: ['./forget-pass.component.scss']
})
export class ForgetPassComponent implements OnInit {

  hidePassword = true;
  password;
  passwordConfirm;
  otp_code: String = " ";
  username;
  user_id;
  firstStep: boolean = true
  otp_timer: number = 120;

  constructor(
    private dialogRef: MatDialogRef<ForgetPassComponent>,
    private authService: AuthService,
    public modulesService: ModulesService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
  }

  getVerifyCode() {
    this.username = this.username?.replace(/\D/g, '')


    if ((this.username.length == 11) || (/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/).test(this.username)) {
      this.authService.reSendVerifyCode(this.username).subscribe(
        res => {
          this.user_id = res.ID;
          this.firstStep = false
        });
    } else {
      if (this.modulesService.lang === 'fa') {
        this.notificationService.error('شماره موبایل وارد نشده است');
      } else {
        this.notificationService.error('ایمیل وارد نشده است');
      }

    }
    this.timerFunc()
  }

  resetPassword() {
    this.username = this.username?.replace(/\D/g, '')
    this.otp_code = this.otp_code?.replace(/\D/g, '')
    if (this.username && this.otp_code && this.password) {
      if (this.password === this.passwordConfirm) {
        this.authService.resetPass(this.username, this.otp_code, this.password, this.user_id).subscribe();
      } else {
        this.notificationService.error('تکرار رمز عبور صحیح نیست')
      }
    } else {
      this.notificationService.error('پر کردن تمام فیلد ها اجباری است!')
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  timerFunc() {
    setTimeout(() => {
      if (this.otp_timer > 0) {
        this.otp_timer -= 1;
        this.timerFunc();
      } else {
        this.otp_timer = 0;
      }
    }, 1000)
  }
}


