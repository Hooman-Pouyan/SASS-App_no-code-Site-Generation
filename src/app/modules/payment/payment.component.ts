import {Component, OnInit} from '@angular/core';
import {OrderService} from "@app/core/services/order.service";
import {ModulesService} from "@app/core/services/modules.service";
import {Router} from "@angular/router";
import {NotificationService} from "@app/core/services/notification.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {_window} from "@app/modules/global/global-variable";
import {PaymentGateways} from "@app/core/models/payment.model";

@Component({
  selector: 'mk-payment',
  templateUrl: './payment.component.html',
})
export class PaymentComponent implements OnInit {

  constructor(
    private orderService: OrderService,
    private modulesService: ModulesService,
    private notificationService: NotificationService,
    private router: Router,
    private credentialService: CredentialsService
  ) {
  }

  ngOnInit() {

    if (this.modulesService.isFreeTry) {
      this.router.navigate(['/']).then(() => {
        this.notificationService.error('این سامانه درگاه بانکی ندارد')
      })
    } else {
      const orderId = this.orderService.payData.orderId;
      const amount = this.orderService.payData.amount;
      const PayType = this.orderService.payData.PayType;

      if (orderId && amount && PayType) {
        switch (this.orderService.payData.gatewayType) {

          case PaymentGateways.idpay:
            const name: string = this.credentialService.credentials.NAME
            this.orderService.payWithIdPay(orderId, amount, PayType, name).subscribe(
              (res: any) => {
                if (res && res.link) {
                  _window.open(res.link, '_self');
                }
              },
              () => {
                this.error()
              }
            )
            break;

          case PaymentGateways.sabin:
            this.orderService.payWithSabin(orderId, amount, PayType).subscribe(
              (res: any) => {
                if (res) {
                  let token = res.token.Token;
                  let link: string = 'https://pna.shaparak.ir/_ipgw_//payment/?lang=fa&token=' + token
                  _window.open(link, '_self');
                }
              },
              () => {
                this.error()
              }
            )
            break;

          case PaymentGateways.zarinpal:
            this.orderService.payWithZarinpal(orderId).subscribe(
              (res: any) => {
                if (res?.Status == 100) {
                  _window.open(`https://www.zarinpal.com/pg/StartPay/${res.Authority}`, '_self');
                }
              },
              () => {
                this.error()
              }
            )
            break;

          case PaymentGateways.paypal:
            this.orderService.payWithPayPal().subscribe(
              (res: any) => {
                // _window.open(res.link, '_self');
                this.router.navigate([`/paypal-error`], { queryParams: {error: res.link}}).then(() => {
                })
              },
              () => {
                this.error()
              }
            )
            break
        }
      } else {
        this.error()
      }
    }
  }

  error(): void {
    this.router.navigate(['/profile']).then(() => {
      this.notificationService.error('متاسفانه خطایی رخ داده است، لطفا دوباره تلاش کنید')
    })
  }

}
