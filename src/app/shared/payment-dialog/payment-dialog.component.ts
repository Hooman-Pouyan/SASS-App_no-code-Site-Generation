import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ModulesService} from "@app/core/services/modules.service";
import {GatewayDataModel, PaymentGateways, PaymentTypeModel, PayType} from "@app/core/models/payment.model";
import {UserService} from "@app/core/services/user.service";
import {OrderService} from "@app/core/services/order.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {copyText} from "@app/modules/global/functions";
import {NotificationService} from "@app/core/services/notification.service";
import {FactorService} from "@app/core/services/factor.service";
import {Router} from "@angular/router";
import {PaymentCardToCardComponent} from "@app/shared/payment-dialog/components/payment-card-to-card/payment-card-to-card.component";
import {PaymentChequeComponent} from "@app/shared/payment-dialog/components/payment-cheque/payment-cheque.component";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'app-payment-dialog',
  templateUrl: './payment-dialog.component.html',
  styleUrls: ['./payment-dialog.component.scss']
})
export class PaymentDialogComponent implements OnInit {

  paymentTypes: PaymentTypeModel[] = [
    {
      type: PayType.cash,
      active: true,
      name: 'پرداخت در محل'
    },
    {
      type: PayType.wallet,
      active: true,
      name: "کیف پول"
    },
    {
      type: PayType.cardToCart,
      active: true,
      name: 'کارت به کارت'
    },
    {
      type: PayType.cheque,
      active: true,
      name: 'پرداخت با چک'
    },
    {
      type: PayType.POS,
      active: true,
      name: 'پرداخت با پوز'
    },
  ];
  selectedPayment = {} as PaymentTypeModel;
  walletBalance: number;
  cardInfo = {} as {
    CARD_NAME: string,
    CARD_NUMBER: number
  }
  copyText = (text: string | number) => {
    copyText(text.toString())
    this.notificationService.valid('شماره کارت کپی شد')
  }
  PayType = PayType


  constructor(
    private matDialogRef: MatDialogRef<PaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public modulesService: ModulesService,
    private userService: UserService,
    private orderService: OrderService,
    private credentialService: CredentialsService,
    private notificationService: NotificationService,
    private factorService: FactorService,
    private router: Router,
    private dialog: MatDialog,
    public storeSettingService: StoreSettingService
  ) {
  }

  ngOnInit(): void {
    this.setWallet();
    this.setCardToCard();
    this.setCheque();
    this.setPayInPlace();
    this.setPayByPOS();
    this.setGateway();
  }

  setGateway(): void {
    if (this.modulesService.idPayGatewayModule) {
      this.paymentTypes.push({
        type: PayType.gateway,
        name: 'درگاه آیدی پی (با تمامی کارتهای بانکی)',
        active: true,
        gatewayName: PaymentGateways.idpay
      })
    } if (this.modulesService.sabinGatewayModule) {
      this.paymentTypes.push({
        type: PayType.gateway,
        name: 'درگاه سابین (با تمامی کارتهای بانکی)',
        active: true,
        gatewayName: PaymentGateways.sabin
      })
    } if (this.modulesService.zarinpalGateway) {
      this.paymentTypes.push({
        type: PayType.gateway,
        name: 'درگاه زرین پال (با تمامی کارتهای بانکی)',
        active: true,
        gatewayName: PaymentGateways.zarinpal
      })
    }if (this.modulesService.paypalGateway) {
      this.paymentTypes.push({
        type: PayType.gateway,
        name: 'PayPal',
        active: true,
        gatewayName: PaymentGateways.paypal
      })
    }
    this.paymentTypes.sort(function(a, b){return a.type - b.type});
  }

  setWallet(): void {
    if (this.modulesService.wallet) {
      this.userService.getWallet(this.credentialService.credentials.ID).subscribe(res => {
        this.walletBalance = +res.FINANCIAL_BALANCE_AFTER
      })
    } else {
      this.paymentTypes = this.paymentTypes.filter(f => f.type != PayType.wallet)
    }
  }

  setCardToCard(): void {
    this.orderService.getCardInfo().subscribe(res => {
      if (res && res.length) {
        this.cardInfo = res[0]
      }
      if (this.cardInfo.CARD_NAME == null || this.cardInfo.CARD_NUMBER == null) {
        this.paymentTypes = this.paymentTypes.filter(f => f.type != PayType.cardToCart)
      }
    })
  }

  setCheque(): void {
    if (!this.modulesService.payWithCheque) {
      this.paymentTypes = this.paymentTypes.filter(f => f.type != PayType.cheque)
    }
  }

  setPayInPlace(): void {
    if (!this.modulesService.payOnSpot) {
      this.paymentTypes = this.paymentTypes.filter(f => f.type != PayType.cash)
    }
  }

  setPayByPOS(): void {
    if (!this.modulesService.payByPOS) {
      this.paymentTypes = this.paymentTypes.filter(f => f.type != PayType.POS)
    }
  }

  closeDialog(): void {
    this.matDialogRef.close()
  }

  submit(): void {
    if (this.selectedPayment.type == PayType.gateway) {
      this.payGateway()
    } else if (this.selectedPayment.type == PayType.cash) {
      this.payCash()
    } else if (this.selectedPayment.type == PayType.wallet) {
      if (this.walletBalance < this.factorService.currentOrder.invoicePrice) {
        this.notificationService.error('برای این سفارش کیف پول شما کسری دارد')
      } else {
        this.payWallet()
      }
    } else if (this.selectedPayment.type == PayType.cardToCart) {
      this.payCardToCard()
    } else if (this.selectedPayment.type == PayType.cheque) {
      this.payCheque()
    } else if (this.selectedPayment.type == PayType.POS) {
      this.payPOS()
    }
  }

  payGateway(): void {
    const payData: GatewayDataModel = {
      orderId: this.factorService.currentOrder.orderID,
      amount: this.factorService.currentOrder.invoicePrice,
      UR_ID: this.credentialService.credentials.USER_ROLE_ID,
      PayType: 'web',
      RedirectType: 'payment',
      gatewayType: this.selectedPayment.gatewayName
    }
    this.orderService.pay(payData).subscribe((res: any) => {
      if (res) {
        this.orderService.payData = payData
        this.router.navigate(['/payment-status/pay']).then(() => {
          this.matDialogRef.close(true)
        })
      }
    })

  }

  payCash(): void {
    this.orderService.payInPlace(this.factorService.currentOrder.orderID).subscribe(() => {
      this.matDialogRef.close(true);
    })
  }

  payWallet(): void {
    this.orderService.payByWallet(this.factorService.currentOrder.orderID).subscribe(() => {
      this.matDialogRef.close(true);
    })
  }

  payCardToCard(): void {
    this.dialog.open(PaymentCardToCardComponent, {
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        res.UR_ID = this.credentialService.credentials.USER_ROLE_ID
        res.ORDER_ID = this.factorService.currentOrder.orderID;
        res.payment_type = 4;
        this.orderService.payCardToCard(res).subscribe(
          () => {
            this.matDialogRef.close(true);
          }
        );
      }
    })

  }

  payPOS(): void {
    this.dialog.open(PaymentCardToCardComponent, {
      width: '400px',
      data: true
    }).afterClosed().subscribe(res => {
      if (res) {
        res.UR_ID = this.credentialService.credentials.USER_ROLE_ID
        res.ORDER_ID = this.factorService.currentOrder.orderID;
        res.payment_type = 4;
        this.orderService.payCardToCard(res).subscribe(
          () => {
            this.matDialogRef.close(true);
          }
        );
      }
    })

  }

  payCheque(): void {
    this.dialog.open(PaymentChequeComponent, {
      width: '400px'
    }).afterClosed().subscribe(res => {
      if (res) {
        res.UR_ID = this.credentialService.credentials.USER_ROLE_ID
        res.ORDER_ID = this.factorService.currentOrder.orderID;
        res.payment_type = 7;
        this.orderService.payWithCheque(res).subscribe(
          () => {
            this.matDialogRef.close(true);
          }
        );
      }
    })

  }

}
