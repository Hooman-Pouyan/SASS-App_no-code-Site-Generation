export interface PaymentTypeModel {
  type?: PayType,
  name?: string,
  active?: boolean,
  gatewayName?: PaymentGateways,
}

export interface GatewayDataModel {
  orderId: number,
  amount: number,
  PayType: 'web',
  RedirectType: 'payment',
  UR_ID: number,
  gatewayType: PaymentGateways
}

export enum PayType {
  gateway,
  cash,
  wallet,
  cardToCart,
  cheque,
  POS,
}

export enum PaymentGateways {
  idpay = 'idpay',
  sabin = 'sabin',
  zarinpal = 'zarinpal',
  paypal = 'paypal',
}
