import { Component, OnInit } from '@angular/core';
import { ModulesService } from '@app/core/services/modules.service';
import { StoreSettingService } from '@app/core/services/store-setting.service';
import { CredentialsService } from '@app/core/services/credentials.service'
import { UserService } from '@app/core/services/user.service';
import { environment } from '@env/environment';
import { OrderService } from "@app/core/services/order.service";
import {_window} from "@app/modules/global/global-variable";

@Component({
  selector: 'mk-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;
  counter: number = 0;

  constructor(
    public userService: UserService,
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    private ordersService: OrderService
  ) {
  }

  ngOnInit(): void {
    this.setInfoUser();
    this.setNewOrderCounter();
  }

  public setInfoUser(): void {
    this.userService.getUserInformation().subscribe(userInformation => {
      this.userService.user = userInformation
    })
  }

  setNewOrderCounter(): void {
    this.ordersService.getNewOrderCounter().subscribe(counter => {
      if (counter?.length) {
        this.counter = counter[0].COUNTER
      }
    })
  }

  clickDrawer(drawer): void {
    if (_window.innerWidth <= 959) {
      drawer.close()
    }
  }

}
