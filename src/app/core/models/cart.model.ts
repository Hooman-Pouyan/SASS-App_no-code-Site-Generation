import {ProductModel} from "@app/core/models/product.model";

export interface CartModel {
  CUSTOMER_ID: number,
  ID: number,
  OFFER_COURIER_SUM: number,
  OFFER_INVOICE_SUM: number,
  OFFER_PRODUCT_SUM: number,
  ORDER_DELIVERY_DATE: Date,
  ORDER_VALUE_WITHOUT_COURIER: number,
  ORDER_VALUE_WITH_COURIER: number,
  PRODUCTS_SUM: number,
  order_products: CartProductModel[]
}

export interface CartProductModel {
  COUNT: number,
  LOCAL_COUNT: number
  DELETED: boolean
  DESCRIPTION: string
  ID: number
  OFFER_VALUE: number
  PRICE: number
  PRICE_AFTER_OFFER: number,
  HAS_GUARANTEE: 0 | 1
  order_product_details: CartProductDetailModel[]
  product_store: {
    AVAILABILITY:number
    ID: number
    PRODUCT_ID: number
    product: ProductModel
  }
}

export interface CartProductDetailModel {
  COUNT: number
  FEATURE_ID_1: number
  FEATURE_ID_2: number
  ID: number,
  HAS_GUARANTEE: 0 | 1,
  ORDER_PRODUCT_ID: number
  ProductFeature1: {
    ID: number
    VALUE: string
    feature: {
      NAME: string,
      ID: number
    }
  },
  ProductFeature2: {
    ID: number
    VALUE: string
    feature: {
      NAME: string,
      ID: number
    }
  }
}


export enum SidenavStatus {
  open,
  close
}


export function checkProductAvailability(available: CartProductModel): boolean {
  return !(available.product_store.AVAILABILITY < available.COUNT)  || (available.product_store.AVAILABILITY == null);
}
