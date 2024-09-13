import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

@Component({
  selector: 'landing-iSee',
  templateUrl: './landing-iSee.component.html',
  styleUrls: [
    './landing-iSee.component.scss',
    './landing-iSee-responsive.component.scss',
  ],
})

export class LandingISeeComponent implements OnInit {


  constructor(
    private dialog: MatDialog,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit() {
  }

}
