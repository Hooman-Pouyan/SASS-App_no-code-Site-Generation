import {Component, OnInit} from '@angular/core';
import {_window} from "@app/modules/global/global-variable";
import {copyText} from "@app/modules/global/functions";
import {Share} from "@app/modules/product/product-pages/default-product/default-product.component";
import {NotificationService} from "@app/core/services/notification.service";

@Component({
  selector: 'social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss']
})
export class SocialLinksComponent implements OnInit {

  route: string
  showLinks: boolean = false;

  socials: {
    svg: string,
    link: string,
    condition: boolean,
  }[] = [
    {
      svg: "telegram.svg",
      link: "https://telegram.me/share/url?url=",
      condition: true,
    },
    {
      svg: "whatsapp.svg",
      link: "https://api.whatsapp.com/send?text=",
      condition: true,
    },
    {
      svg: "facebook.svg",
      link: "https://www.facebook.com/sharer.php?u=",
      condition: true,
    },
    {
      svg: "twitter.svg",
      link: "https://twitter.com/intent/tweet?url=",
      condition: true,
    },
  ]


  constructor(
    private notificationService: NotificationService,
  ) {
  }


  ngOnInit(): void {
    this.route = _window.location.href

  }

  copyToClipboard() {
      copyText(_window.location.href)
      this.notificationService.valid('لینک محصول ذخیره شد')
  }


}
