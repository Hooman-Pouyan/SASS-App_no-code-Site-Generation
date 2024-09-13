import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss']
})
export class PaymentStatusComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public storeSettingService: StoreSettingService
  ) {
  }

  appUrl: string = window.location.origin + '/'

  paymentStatus: {
    status: string | number,
    orderId: string,
    RefNum: string, // shomare tarakonesh
    amount: number,
    PayType: 'web' | 'app',
    storeName_Fa: string,
    statusType?: 'valid' | 'invalid',
    statusName?: string
  } = {
    status: '',
    orderId: '',
    RefNum: '',
    amount: 0,
    PayType: 'web',
    storeName_Fa: document.getElementById('title').innerHTML,
  }

  ngOnInit() {
    this.route.queryParams.subscribe(query => {
      if (query) {
        this.paymentStatus.status = query.status;
        this.paymentStatus.orderId = query.orderId;
        this.paymentStatus.PayType = query.PayType;
        this.paymentStatus.RefNum = query.RefNum;
        this.paymentStatus.amount = +query.Amount;
        this.setStatus()
      }
    });
  }

  setStatus(): void {
    switch (this.paymentStatus.status) {
      case '100':
      case 'ok':
      case 'OK':
      case '10':
      case '101':
        this.paymentStatus.statusType = 'valid'
        this.paymentStatus.statusName = 'پرداخت موفق';
        break

      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
        this.paymentStatus.statusType = 'invalid'
        this.paymentStatus.statusName = 'پرداخت ناموفق';
        break

      case 'Canceled By User':
      case '7':
        this.paymentStatus.statusType = 'invalid'
        this.paymentStatus.statusName = 'پرداخت لغو شده';
        break
    }
  }


}
