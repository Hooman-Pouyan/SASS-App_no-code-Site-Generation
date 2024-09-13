import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserChangePasswordDialogComponent } from './user-change-password-dialog/user-change-password-dialog.component';
import { ModulesService } from "@app/core/services/modules.service";
import { UserService } from '@app/core/services/user.service';
import {isValidNationalCode} from "@app/modules/global/functions";
import {NotificationService} from "@app/core/services/notification.service";

@Component({
  selector: 'mk-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  name: string = "";
  NationalCode: string = "";
  username: string = ""
  bankAccount : string = ""
  avatar: string = ""
  email: string = ""
  userId: number;
  pastime: string
  loading: boolean = true;

  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    public modulesService: ModulesService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.setDataPage();
  }

  setDataPage() {
    this.loading = true;
    this.userService.getUserInformation().subscribe(
      userInfo => {
        if (userInfo.user_additional !== null) {
          this.userId = userInfo.user_additional.USER_ID;
          this.pastime = userInfo.user_additional.PASTIME;
          this.name = userInfo.NAME
          this.username = userInfo.USER_NAME
          this.avatar = userInfo.AVATAR
          this.email = userInfo.user_additional.EMAIL
        }
        this.loading = false;
      }
    );
  }

  changePasswordClicked() {
    const _data = {
      username: this.username,
      userId: this.userId
    }
    this.dialog.open(UserChangePasswordDialogComponent, {
      width: '500px',
      disableClose: false,
      data: _data
    });
  }

  changeInfoUserClicked() {
    this.userService.userChangeInfo(this.name, this.email, this.pastime).subscribe( () =>{})
  }

  checkNationalCode(NationalCode){
    if(isValidNationalCode(NationalCode)) {
      this.notificationService.valid('کدملی ثبت شد')
    }
    else  {
      this.notificationService.error('کد ملی نامعتبر است')
    }
  }

  changeBankCard(){

  }

}
