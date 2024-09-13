import {Component, Input, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {environment} from 'src/environments/environment';
import {ModulesService} from "@app/core/services/modules.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {UserService} from "@app/core/services/user.service";
import {LawsComponent} from "@app/modules/pages/laws/laws.component";
import {SocialMediaContact, SocialType} from "@app/core/models/store.model";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {_window} from "@app/modules/global/global-variable";
import {StoreService} from "@app/core/services/store.service";

@Component({
  selector: 'default-footer',
  templateUrl: './default-footer.component.html',
  styleUrls: ['./default-footer.component.scss'],
})
export class DefaultFooterComponent implements OnInit {

  @Input() backgroundColor: string = '#333333';
  imageUrl: string = environment.ADMIN_API_URL;
  window: Window = _window;
  customersCount: number = 0;

  youtubePrefix: string = 'https://youtube.com/user/';
  whatsappPrefix: string = 'https://web.whatsapp.com/send?phone=';
  aparatPrefix: string = 'https://aparat.com/';
  facebookPrefix: string = 'https://facebook.com/';
  instagramPrefix: string = 'https://instagram.com/';
  telegramPrefix: string = 'https://t.me/';
  linkedinPrefix: string = 'https://linkedin.com/in/';
  twitterPrefix: string = 'https://twitter.com/';

  footerLinks: {
    defaultText: string,
    defaultLink: string,
    type: string
  }[] = [
    {
      type: 'footer-help',
      defaultText: 'راهنما',
      defaultLink: '/help'
    },
    {
      type: 'footer-return-of',
      defaultText: 'شرایط مرجوعی کالا',
      defaultLink: '/return-of'
    },
    {
      type: 'footer-contact',
      defaultText: 'تماس با ما',
      defaultLink: '/contact-us'
    },
    {
      type: 'footer-faq',
      defaultText: 'پرسش های متداول',
      defaultLink: '/questions'
    },
    {
      type: 'footer-about',
      defaultText: 'درباره ما',
      defaultLink: '/about-us'
    },
  ]

  constructor(
    public dialog: MatDialog,
    public modulesService: ModulesService,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public userService: UserService,
    public dragDropService: DragDropService,
    private storeService: StoreService
  ) {
  }

  ngOnInit(): void {
    if (this.modulesService.hasBlog) {
      this.footerLinks.push({
        type: 'footer-blog',
        defaultText: 'بلاگ',
        defaultLink: '/blogs'
      })
    }
    if (this.modulesService.hasNews) {
      this.footerLinks.push({
        type: 'footer-news',
        defaultText: 'اخبار',
        defaultLink: '/news'
      })
    }
    if (this.modulesService.isSpora) {
      this.getStoreCustomers();
    }

    if (this.modulesService.isInfoBase) {
      this.footerLinks = this.footerLinks.filter(f => f.type != 'footer-return-of')
    }
  }

  getStoreCustomers(): void {
    this.storeService.getCurrentStore().subscribe(
      (store) => {
        if (store.customer_count) {
          this.customersCount = store.customer_count
        }
      }
    );
  }


  socialLink(social: SocialMediaContact): string {
    // social.link =  social.link.replace(this[`${social.type}Prefix`] , "")
    if (social.type == SocialType.whatsapp) {
      return social.link.replace('web', 'api')
    } else {
      return social.link
    }
  }

  openLawsDialog() {
    this.dialog.open(LawsComponent, {
      width: '60rem',
      maxWidth: '100%'
    });
  }

  zarinpalLink(): void {
    window.open("https://www.zarinpal.com/trustPage/" + window.location.hostname, null, "width=450, height=600, scrollbars=no, resizable=no")
  }

}
