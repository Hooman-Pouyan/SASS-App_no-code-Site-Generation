import {Component, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {ActivatedRoute} from "@angular/router";
import {FactorService} from "@app/core/services/factor.service";

@Component({
  selector: 'mk-default-factor',
  templateUrl: './default-factor.component.html',
  styleUrls: ['./default-factor.component.scss']
})
export class DefaultFactorComponent implements OnInit {


  constructor(
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    private activatedRoute: ActivatedRoute,
    private factorService: FactorService
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.data.subscribe(res => {
      if (res?.orderData?.length) {
        this.factorService.orderID = res.orderData[0].ID
        this.factorService.selectOrder([this.factorService.currentOrder.orderID]).subscribe(() => {})
      }
    })
  }

}
