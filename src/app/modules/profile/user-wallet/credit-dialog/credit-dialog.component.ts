import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {OrderService} from "src/app/core/services/order.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {Router} from "@angular/router";
import {PaymentGateways, PaymentTypeModel} from "@app/core/models/payment.model";
import {ModulesService} from "@app/core/services/modules.service";
import {NotificationService} from "@app/core/services/notification.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'mk-credit-dialog',
  templateUrl: './credit-dialog.component.html',
  styleUrls: ['./credit-dialog.component.scss']
})
export class CreditDialogComponent implements OnInit {

  creditValue: number = 0;
  paymentTypes: PaymentTypeModel[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreditDialogComponent>,
    private orderService: OrderService,
    private credentialService: CredentialsService,
    private router: Router,
    public modulesService: ModulesService,
    private notificationService: NotificationService,
    public storeSettingService: StoreSettingService
  ) {
  }

  ngOnInit() {
    this.setGateway()
  }

  setGateway(): void {
    if (this.modulesService.idPayGatewayModule) {
      this.paymentTypes.push({
        gatewayName: PaymentGateways.idpay
      })
    } if (this.modulesService.sabinGatewayModule) {
      this.paymentTypes.push({
        gatewayName: PaymentGateways.sabin
      })
    } if (this.modulesService.zarinpalGateway) {
      this.paymentTypes.push({
        gatewayName: PaymentGateways.zarinpal
      })
    }

    if (this.paymentTypes.length == 0) {
      this.notificationService.error('این فروشگاه درگاه بانکی ندارد')
    }
  }

  pay() {
    this.orderService.payData = {
      PayType: 'web',
      RedirectType: 'payment',
      amount: this.creditValue * 10,
      orderId: 1,
      UR_ID: this.credentialService.credentials.USER_ROLE_ID,
      gatewayType: this.paymentTypes[Math.floor(Math.random() * this.paymentTypes.length)].gatewayName
    }
    this.router.navigate(['/payment-status/pay']).then(() => {
      this.dialogRef.close(true)
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
