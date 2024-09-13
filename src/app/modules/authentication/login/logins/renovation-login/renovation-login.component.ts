import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {AppService} from "@app/core/services/app.service";
import {AuthService} from "@app/core/services/auth.service";
import {ForgetPassComponent} from "../../components/forget-pass/forget-pass.component";
import {GoogleLoginProvider, SocialAuthService} from "angularx-social-login";
import {UserRoles} from "@app/core/models/credentials.model";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {NotificationService} from "@app/core/services/notification.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'renovation-login',
  templateUrl: './renovation-login.component.html',
  styleUrls: ['./renovation-login.component.scss']
})
export class RenovationLoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private appService: AppService,
    private authService: AuthService,
    public modulesService: ModulesService,
    private socialAuthService: SocialAuthService,
    private credentialsService: CredentialsService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    public storeSettingService: StoreSettingService
  ) {
  }

  ngOnInit() {
    this.creatForm();
  }

  creatForm() {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required],
      otp: [null, Validators.required],
    })
  }

  onSubmit() {
    const username: any = this.loginForm.controls.username.value;
    const password: any = this.loginForm.controls.password.value;
    this.credentialsService.login(username, password);
  }


  openForgetPassDg() {
    this.dialog.open(ForgetPassComponent, {
      width: '400px',
      maxWidth: '100%',
    });
  }

  loginWithGoogle() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      this.authService.SignWithGoogle(res.email, res.name, res.photoUrl, this.credentialsService.credentials.ID).subscribe(
        () => {
          this.credentialsService.login(res.email, "123456");
        }
      );
    });
  }
}

