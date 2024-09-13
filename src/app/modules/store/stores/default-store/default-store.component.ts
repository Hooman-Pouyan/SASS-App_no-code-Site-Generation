import {Component, HostListener, OnInit} from '@angular/core';
import {StoreService} from 'src/app/core/services/store.service';
import {environment} from 'src/environments/environment';
import {ModulesService} from 'src/app/core/services/modules.service';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from '@app/core/services/credentials.service';
import {SidenavStatus} from "@app/core/models/cart.model";
import {CartService} from "@app/core/services/cart.service";
import {WorkDaysModel} from "@app/core/models/store.model";
import {_window} from "@app/modules/global/global-variable";
import {AppService} from "@app/core/services/app.service";

@Component({
  selector: 'mk-default-store',
  templateUrl: './default-store.component.html',
  styleUrls: ['./default-store.component.scss']
})
export class DefaultStoreComponent implements OnInit {

  cartSidenavStatus = SidenavStatus;
  cartCount: number = 0;
  date: Date = new Date();
  imageUrl: string = environment.ADMIN_API_URL;
  headerTopFlag: boolean = false;
  today_time = {} as {
    start_time1: string,
    end_time1: string,
    start_time2: string,
    end_time2: string,
    holiday: boolean
  };


  constructor (
    private storeService: StoreService,
    public modulesService: ModulesService,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.setStoreInfo();
    this.onCallCartNotebook();
  }

  setStoreInfo() {
    this.storeService.getCurrentStore().subscribe(
      (store) => {
        this.storeSettingService.motto = store.store_additional?.MOTTO;
        if (store.store_images) {
          this.storeSettingService.desktopBanner = store.store_images.find(f => f.NAME == 'banner')?.ADDRESS || 'header_02.png'
          this.storeSettingService.mobileBanner = store.store_images.find(f => f.NAME == 'bannermobile')?.ADDRESS || 'header_02.png'
        } else {
          this.storeSettingService.desktopBanner = this.storeSettingService.mobileBanner = 'header_02.png';
        }
        this.setWorkDays(store.store_hours);
      }
    );
  }

  setWorkDays(workDays: WorkDaysModel[]): void {
    let today: Date = new Date();
    for (let i = 0; i <= 6; i++) {
      let date: Date = new Date()
      date.setDate(today.getDate() + i)
      if (date.getDay() == 6) {
        const index: number = workDays.findIndex(f => f.WEEK_DAY == 1)
        if (index != -1) {
          workDays[index].date = date
        }
      } else {
        const index: number = workDays.findIndex(f => f.WEEK_DAY == date.getDay() + 2)
        if (index != -1) {
          workDays[index].date = date
        }
      }
    }

    workDays.sort((a, b) => +new Date(a.date) - +new Date(b.date))

    this.today_time.start_time1 = workDays[0].START_TIME;
    this.today_time.start_time2 = workDays[0].START_TIME2;
    this.today_time.end_time1 = workDays[0].END_TIME;
    this.today_time.end_time2 = workDays[0].END_TIME2;
    this.today_time.holiday = workDays[0].HOLIDAY == 1;
  }

  @HostListener('window:scroll')
  onScroll() {
    this.headerTopFlag = this.appService.muchScrolled > 300;
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

}
