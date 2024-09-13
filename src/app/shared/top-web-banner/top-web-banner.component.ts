import {Component, OnInit} from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";
import {CookieService} from "@app/core/services/cookie.service";

@Component({
  selector: 'top-web-banner',
  templateUrl: './top-web-banner.component.html',
  styleUrls: ['./top-web-banner.component.scss']
})
export class TopWebBannerComponent implements OnInit {

  freeTryBanner: boolean = true;

  constructor(
    public modulesService: ModulesService,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    this.freeTryBanner = this.cookieService.getCookie('free-try-banner') != 'true'
  }

  hideFreeTryBanner(): void {
    this.cookieService.setCookie('free-try-banner', true, 1)
    this.freeTryBanner = false;
  }

}
