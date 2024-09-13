import {Component, OnInit} from '@angular/core';
import {environment} from 'src/environments/environment';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {BannerType} from "@app/core/models/store.model";

@Component({
  selector: 'mk-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  helpImage: string = '../../../../assets/img/help/help.png';

  constructor(
    public storeSettingService: StoreSettingService
  ) {
  }

  ngOnInit() {
    this.getHelpImage();
  }

  getHelpImage() {
    this.storeSettingService.getBanners(BannerType.help).subscribe(res => {
      if (res) {
        const [response] = res;
        if (response.IMAGE) {
          this.helpImage = `${environment.ADMIN_API_URL}/assets/img/settings/${response.IMAGE}`;
        }
      }
    })
  }
}
