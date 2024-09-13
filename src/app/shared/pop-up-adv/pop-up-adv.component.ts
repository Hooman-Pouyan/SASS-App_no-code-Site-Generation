import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from "@env/environment";
import {BannerType} from "@app/core/models/store.model";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up-adv.component.html',
  styleUrls: ['./pop-up-adv.component.scss']
})
export class PopUpAdvComponent implements OnInit {

  constructor(
    private storeSettingService: StoreSettingService
  ) {
  }

  @Output() closeDialog: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Input() popUpImage: string;
  @Input() popUpLink: string;

  ngOnInit(): void {
    this.getPopUp()
  }

  getPopUp(): void {
    this.storeSettingService.getBanners(BannerType.popUp).subscribe(res => {
      if (res && res.length) {
        this.popUpImage = environment.ADMIN_API_URL + '/assets/img/settings/' + res[0].IMAGE
        this.popUpLink = res[0].BRAND_NAME.includes('http') ? res[0].BRAND_NAME : undefined
      }
    })
  }

  close() {
    const d = new Date();
    const hours: number = 48
    const endDate = new Date(d.getTime() + 3600 * hours * 1000);
    localStorage.setItem('pop-expire', String(endDate))
    this.closeDialog.emit(true)
  }

}
