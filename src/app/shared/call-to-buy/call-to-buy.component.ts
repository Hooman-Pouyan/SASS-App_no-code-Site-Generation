import {Component, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {MatDialogRef} from "@angular/material/dialog";
import {SocialType} from "@app/core/models/store.model";
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'call-to-buy',
  templateUrl: './call-to-buy.component.html',
  styleUrls: ['./call-to-buy.component.scss']
})
export class CallToBuyComponent implements OnInit {

  whatsapp: string;
  telegram: string;
  instagram: string;

  constructor(
    public dialogRef: MatDialogRef<CallToBuyComponent>,
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,

  ) {
  }

  ngOnInit(): void {
    this.storeSettingService.store.socials.forEach(social => {
      if (social.link) {
        switch (social.type) {
          case SocialType.instagram:
            social.link = social.link.replace('https://instagram.com/', "")
            social.link = social.link.replace('https://www.instagram.com/', "")
            this.instagram = 'https://instagram.com/' + social.link;
            break
          case SocialType.whatsapp:
            social.link = social.link.replace('https://api.whatsapp.com/send?phone=', "")
            this.whatsapp = 'https://api.whatsapp.com/send?phone=' + social.link;
            break
          case SocialType.telegram:
            social.link = social.link.replace('https://t.me/', "")
            this.telegram = 'https://t.me/' + social.link;
        }
      }
    })
  }

}
