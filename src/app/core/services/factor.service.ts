import {Injectable} from "@angular/core";
import {catchError, map} from "rxjs/operators";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {throwError} from "rxjs";
import {FactorModel, OrderType} from "@app/core/models/factor.model";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Injectable({
  providedIn: "root"
})
export class FactorService {

  private _currentOrder = {} as FactorModel;

  constructor(
    private httpClient: HttpClient,
    private storeSettingService: StoreSettingService
  ) {
  }

  // functions

  get currentOrder(): FactorModel {
    return this._currentOrder
  }

  set orderID(id: number) {
    this._currentOrder.orderID = id
  }

  set orderFreeCourier(status: boolean) {
    this._currentOrder.freeCourier = status
  }

  set orderType(orderType: OrderType) {
    this._currentOrder.orderType = orderType
  }

  set orderDeliveryTime(time: Date) {
    this._currentOrder.orderDeliveryDate = time
  }

  set orderAddressID(addressID: number) {
    this._currentOrder.addressID = addressID
  }

  set orderProductsPrice(productsPrice: number) {
    this._currentOrder.productsPrice = productsPrice
  }

  set orderProductsOffer(productsOffer: number) {
    this._currentOrder.productsOffer = productsOffer
  }

  set orderCourierPrice(courierPrice: number) {
    this._currentOrder.courierPrice = courierPrice
  }

  set orderCourierOffer(courierOffer: number) {
    this._currentOrder.courierOffer = courierOffer
  }

  set orderInvoicePrice(invoicePrice: number) {
    this._currentOrder.invoicePrice = invoicePrice
  }

  set orderInvoiceOffer(invoiceOffer: number) {
    this._currentOrder.invoiceOffer = invoiceOffer
  }

  set firstOrderOffer(firstOrderOffer: number) {
    this._currentOrder.firstOrderOffer = firstOrderOffer
  }

  set introducedOffer(introducedOffer: number) {
    this._currentOrder.introducedOffer = introducedOffer
  }

  set discountCodeOffer(discountCodeOffer: number) {
    this._currentOrder.discountCodeOffer = discountCodeOffer
  }

  set giftOffer(giftOffer: number) {
    this._currentOrder.giftOffer = giftOffer
  }

  get discountCodeOffer(): number {
    return this._currentOrder.discountCodeOffer
  }

  set discountCode(discountCode: string) {
    this._currentOrder.discountCode = discountCode
  }

  get discountCode(): string {
    return this._currentOrder.discountCode
  }

  set discountCodeVerified(discountCodeVerified: boolean) {
    this._currentOrder.discountCodeVerified = discountCodeVerified
  }

  get discountCodeVerified(): boolean {
    return this._currentOrder.discountCodeVerified
  }

  get giftOffer(): number {
    return this._currentOrder.giftOffer
  }

  set customTransportID(customTransportID: number) {
    this._currentOrder.customTransportID = customTransportID
  }

  updateOrderAndCourierValue(): void {
    this.getOrderAndCourierValue().subscribe(res => {
      if (res?.length) {
        this.orderProductsOffer = +res[0].OFFER_PRODUCT_SUM;
        this.orderCourierPrice = +res[0].CORIER_VALUE;
        this.orderCourierOffer = +res[0].OFFER_COURIER_SUM;
        this.orderInvoiceOffer = +res[0].OFFER_INVOICE_SUM;
        // this.orderInvoicePrice = +res[0].ORDER_VALUE_WITH_COURIER;
        this.orderInvoicePrice = this.currentOrder.productsPrice +
          this.currentOrder.courierPrice + this.currentOrder.courierOffer;
        this.discountCodeOffer = this.discountCodeOffer ? this.discountCodeOffer : 0
      }
    })
  }

  updateCourierValue(): void {
    this.getCourierValueUpdate().subscribe(res => {
      if (res) {
        this.updateOrderAndCourierValue();
        this.updateOrderAndCourierType();
      }
    })
  }

  updateOrderAndCourierType(): void {
    this.getOrderAndCourierType().subscribe(res => {
      this.orderFreeCourier = res.FREE_COURIER
      this.orderType = res.CREAT_ORDER_TYPE
    })
  }

  // https services

  selectOrder(select: number[]) {
    const body = {
      SELECT: select,
      UNSELECT: []
    }

    return this.httpClient.put("/api/order/SelectOrder", body).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  changeOrderSendTime(data) {
    return this.httpClient.put("/api/order/ChangeTime", data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOrderAndCourierValue() {
    const _data = {
      ORDER: this.currentOrder.orderID
    }

    return this.httpClient.put("/api/order/getOrderAndCourierValue", _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getCourierValueUpdate() {
    const _data = {
      ORDER_ID: this.currentOrder.orderID
    }

    return this.httpClient.post("/api/order/calcCourierValue", _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  checkIdentifierCode() {
    return this.httpClient.get("/api/offers/autoApply").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  submitOrder(addressID: number, data: {
    ID,
    ORDER_DELIVERY_DATE,
    ORDER_DELIVERY_TYPE_ID,
    COMMENT,
  }[], code: string) {

    const _data = {
      CUSTOMER_ADDR_ID: addressID,
      ORDERS: data,
      OFFER_CODE: code ? code : ''
    };

    return this.httpClient.put("/api/order/customerAccept", _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getCustomDeliveries() {
    return this.httpClient.get("/api/features/get_transporttype").pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOrderAndCourierType() {
    return this.httpClient.get(`/api/order/creat_order_type/${this.storeSettingService.store.id}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  checkOfferCode(code: string) {
    const data = {
      CODE: code
    }
    return this.httpClient.post("/api/offers/code", data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
