export interface OrderModel {
  ADDRESS: string
  CARDMASKPAN: string
  CARD_DATES: Date
  CHEQUE_BANK: string
  CHEQUE_DATE: Date
  CHEQUE_NUMBER: string
  CHEQUE_OWNER: string
  CHEQUE_TYPE: number
  CONFIRM_BY_CUSTOMER: number
  CONFIRM_BY_PROVIDER: number
  CORIER_VALUE: number
  COURIER_NAME: string
  COURIER_PELAK: string
  COURIER_PHONE: string
  COURIER_ROLE_ID: number
  CUSTOMER_ID: number
  CUSTOMER_PHONE: string
  NAME: string
  ORDER_DATE: string
  ORDER_DATE_FILTER: Date
  ORDER_DELIVERY_DATE: string
  ORDER_DELIVERY_TIME: string
  ORDER_DELIVERY_TIME_2: string
  ORDER_DELIVERY_TYPE_ID: number
  ORDER_DELIVER_FILTER: Date
  ORDER_ID: number
  ORDER_STATUS_ID: OrderStatus
  ORDER_STATUS_NAME: string
  ORDER_TIME: string
  ORDER_VALUE_WITHOUT_COURIER: number
  ORDER_VALUE_WITH_COURIER: number
  PAYMENTTYPE_NAME: string
  PAYMENT_STATUS: 2
  PAYMENT_STATUS_NAME: string
  PAYMENT_TYPE_DEFAULT: string
  SAYAD_ID: number
  STORE_ID: number
  STORE_NAME: string
  STORE_PORTION: string
  SYSTEM_PORTION: string
  TAX_VALUE: number
  TRACENO: number
}

export interface OrderDetailModel {
  ADMIN_DESCRIPTION: string
  CHANGE_PRODUCT_ID: 0
  COMMENTS: string
  CONFIRM_BY_CUSTOMER: number
  CONFIRM_BY_PROVIDER: number
  CORIER_END_DATE: Date
  CORIER_VALUE: number
  COUNT_DETAIL: any
  COURIER_NAME: string
  COURIER_PELAK: string
  COURIER_PHONE: string
  COURIER_X: number
  COURIER_Y: number
  CRAT_ID: number
  ORDER_PRODUCT_HAS_GUARANTEE: 0 | 1,
  ORDER_PRODUCT_DETAIL_HAS_GUARANTEE: 0 | 1,
  CUSTOMER_ADDRESS: string
  CUSTOMER_EMAIL: string
  CUSTOMER_NUMBER: string
  CUSTOMER_PHONE: string
  DELAY_REASON: string
  DELETED_DETAIL: any
  DESCRIPTION: string
  FEATURE_ID_1: number
  FEATURE_ID_2: number
  FEATURE_NAME1: string
  FEATURE_NAME2: string
  INPUT_CORIER_VALUE: any
  NAME: string
  OFFER_COURIER_SUM: number
  OFFER_INVOICE_SUM: number
  OFFER_PRODUCT_SUM: number
  OFFER_VALUE_SUM: number
  OFFER_VALUE_SUM_PERPRODUCT: number
  ORDER_DATE: "1401/01/27"
  ORDER_DATE_FILTER: Date
  ORDER_DELETED: 0 | 1
  ORDER_DELIVERY_DATE: string
  ORDER_DELIVERY_TIME: string
  ORDER_DELIVERY_TIME_2: string
  ORDER_DELIVER_FILTER: Date
  ORDER_ID: number
  ORDER_PRODUCT_DELETED: any
  ORDER_PRODUCT_DETAIL_ID: any
  ORDER_STATUS_ID: OrderStatus
  ORDER_STATUS_NAME: string
  ORDER_TIME: string
  ORDER_VALUE_WITHOUT_COURIER: number
  ORDER_VALUE_WITH_COURIER: number
  PAYMENT_STATUS: PaymentStatus
  PAYMENT_STATUS_NAME: string
  PRICE: number
  PRICE_AFTER_OFFER: number
  PRICE_SUM: number
  PRICE_SUM_DETAIL: number
  PRODUCT_COUNT: number
  PRODUCT_FEATURE_ID1: number
  PRODUCT_FEATURE_ID2: number
  PRODUCT_IMAGE: string
  PRODUCT_NAME: string
  PRODUCT_UNIT_ID: number
  PRODUCT_UNIT_NAME: string
  STORE_ADDRESS: string
  STORE_EMAIL: string
  STORE_NAME: string
  STORE_PHONE: string
  TAX_VALUE: number
  TRANSPORT: string
  TRANSPORT_DESCRIPTION: string
  VALUE1: string
  VALUE2: string
}

export interface PaymentDetail {
  BANK_REFRENCE_ID: string
  CORIER_VALUE: number
  CUSOTMER_ADDRESS: string
  CUSTOMER_ID: number
  CUSTOMER_NAME: string
  CUSTOMER_USER_NAME: string
  INPUT_CORIER_VALUE: null
  OFFER_COURIER_SUM: number
  OFFER_INVOICE_SUM: number
  OFFER_PRODUCT_SUM: number
  ORDER_DATE: Date
  ORDER_ID: number
  PAYMENT_DATE: Date
  PAYMENT_TYPE: number
  PAYMENT_TYPE_NAME: string
  STORE_ID: number
  STORE_NAME: string
  STORE_OFFER_COURIER_SUM: number
  STORE_OFFER_INVOCE_SUM: number
  STORE_OFFER_PRODUCT_SUM: number
  STORE_PORTION: string
  SUMOF_OFFER_STORE_PORTION: string
  SUMOF_OFFER_SYSTEM_PORTION: string
  SYSTEM_OFFER_COURIER_SUM: number
  SYSTEM_OFFER_INVOCE_SUM: number
  SYSTEM_OFFER_PRODUCT_SUM: number
  SYSTEM_PORTION: string
  TOTAL_PAYMENT: number
}

export enum OrderStatus {
  inCart,
  new,
  adminAccepted,
  returned,
  customerAccepted,
  courierOnWay,
  customerCanceled,
  customerReceived,
  courierInStore,
  courierArrived,
  customerPayPending,
  courierFinding,
  customerPayed,
  customerDeleted,
  adminDeleted,
  courierAccepted,
  inNotebook,
  adminAcceptPending,
  canceledDueNotPay = 100400,
}

export enum PaymentStatus {
  payed = 1,
  unPayed
}

export enum UserOrderStatus {
  active = 1,
  inactive,
  detail
}
