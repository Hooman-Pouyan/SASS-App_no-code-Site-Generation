import { Component, OnInit } from '@angular/core';
import {environment} from "@env/environment";
import {MatDialog} from "@angular/material/dialog";
import {ModulesService} from "@app/core/services/modules.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {UserService} from "@app/core/services/user.service";
import {LawsComponent} from "@app/modules/pages/laws/laws.component";

@Component({
  selector: 'renovation-footer',
  templateUrl: './renovation-footer.component.html',
  styleUrls: ['./renovation-footer.component.scss']
})
export class RenovationFooterComponent implements OnInit {

  adminImageUrlDevelop: string = environment.ADMIN_API_URL;

  constructor(
    public dialog: MatDialog,
    public modulesService: ModulesService,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public userService: UserService
  ) {
  }

  ngOnInit(): void {
  }

  openLawsDialog() {
    this.dialog.open(LawsComponent, {
      width: '60rem',
      maxWidth: '100%'
    });
  }

}
