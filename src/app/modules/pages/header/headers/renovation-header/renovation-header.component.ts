import { Component, OnInit } from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {UserService} from "@app/core/services/user.service";

@Component({
  selector: 'renovation-header',
  templateUrl: './renovation-header.component.html',
  styleUrls: ['./renovation-header.component.scss']
})
export class RenovationHeaderComponent implements OnInit {

  constructor(
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.credentialsService.logout();
  }

}
