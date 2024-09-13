import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '@app/core/services/user.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'mk-user-change-password-dialog',
  templateUrl: './user-change-password-dialog.component.html',
  styleUrls: ['./user-change-password-dialog.component.scss']
})
export class UserChangePasswordDialogComponent implements OnInit {
  changePasswordForm: FormGroup;
  hidePassword: boolean = true;
  username = this.data.username;
  otp_timer: number = 120;
  remain: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserChangePasswordDialogComponent>,
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) private data,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.creatForm();
  }

  creatForm() {
    this.changePasswordForm = this.fb.group({
      otpCode: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(4)]],
      newPassworddConfirm: ['', [Validators.required, this.passwordConfirmValidator]],
    });
  }

  saveChangePassWord() {
    const _username = this.username + this.changePasswordForm.value.otpCode;
    this.userService.userChangePassword(
      _username,
      this.changePasswordForm.value.newPassword,
      this.changePasswordForm.value.newPassworddConfirm).subscribe(
        () => {
          this.dialogRef.close();
        }
      );
  }

  backClicked() {
    this.dialogRef.close();
  }

  getOtpCode(): void {
    this.authService.getCreateOtpCode(this.username).subscribe(() => { });
    this.remain = true
    this.timerFunc()
  }

  passwordConfirmValidator(input: FormControl) {
    const value = input.value;
    if (value === input.root.value.newPassword) {
      return null;
    } else {
      return 'Not Equal';
    }
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
