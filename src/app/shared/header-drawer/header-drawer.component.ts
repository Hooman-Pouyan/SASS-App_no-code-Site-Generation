import {Component, OnInit} from '@angular/core';
import {AppService} from "@app/core/services/app.service";
import {SidenavStatus} from "@app/core/models/cart.model";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {ModulesService} from "@app/core/services/modules.service";
import {MatDialog} from '@angular/material/dialog';
import {SearchDialogComponent} from '../search-dialog/search-dialog.component';

@Component({
  selector: 'header-drawer',
  templateUrl: './header-drawer.component.html',
  styleUrls: ['./header-drawer.component.scss']
})
export class HeaderDrawerComponent implements OnInit {

  sidenavStatus = SidenavStatus;

  links: {
    name: string,
    link: string,
    modules?: string[],
    query?: { [key: string]: string }
  }[] = [
    {
      link: '/',
      name: 'خانه (صفحه اصلی)',
    },
    {
      link: (this.modulesService.isBazargardon || this.modulesService.isMotolead) ? '/store/category/1':'/store',
      name: 'محصولات',
    },
    {
      link: '/store/category',
      name: 'دسته بندی ها',
    },
    {
      link: '/blogs',
      name: 'مجله خبری',
      modules: ['hasBlog']
    },
    {
      link: '/store/category/1',
      name: 'جدید ترین محصولات',
    },
    {
      link: '/store/category/1',
      name: 'پربازدید ترین محصولات',
      query: {'sort': '3'},
    },
    {
      link: '/store/category/1',
      name: 'تخفیف ها',
      query: {'sort': '4'},
    },
    {
      link: '/store/invite-friends',
      name: 'معرفی به دوستان',
    },
    {
      link: '/store/favourite',
      name: 'لیست علاقه مندی ها',
    },
    {
      link: '/contact-us',
      name: 'ارتباط با ما',
    },
    {
      link: '/about-us',
      name: 'درباره ما',
    },
    {
      link: '/help',
      name: 'راهنما',
    },
    {
      link: '/questions',
      name: 'پرسش های متداول',
    },
  ]

  constructor(
    public appService: AppService,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public modulesService: ModulesService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
  }

  checkMenuCondition(conditions: string[]): boolean {
    if (conditions?.length) {
      return conditions.every(e => this.modulesService[e])
    } else {
      return true
    }
  }

  openSearchDg() {
    this.dialog.open(SearchDialogComponent, {
      maxWidth: '100%',
      width: '100%',
      height: "100%",
      autoFocus: false,
    });
  }

}
