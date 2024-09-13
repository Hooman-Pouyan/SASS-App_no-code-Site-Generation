export interface FactorModel {
  addressID: number,
  orderID: number,
  orderDeliveryDate: Date,
  comment: string,
  orderDeliveryTypeId: number,
  discountCode: string,
  discountCodeVerified: boolean,
  customTransportID: number,
  orderType: OrderType

  productsPrice: number,
  productsOffer: number,
  courierPrice: number,
  courierOffer: number,
  invoicePrice: number,
  invoiceOffer: number,
  discountCodeOffer: number,
  freeCourier: boolean,
  firstOrderOffer: number,
  introducedOffer: number,
  giftOffer: number,
  taxValue: number,

}

export enum OrderType {
  direct,
  providerAccept
}
