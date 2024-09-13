import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {throwError} from 'rxjs';
import {OrderDetailModel, OrderModel, UserOrderStatus} from "@app/core/models/order.model";
import {catchError, map} from "rxjs/operators";
import {GatewayDataModel} from "@app/core/models/payment.model";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private _payData = {} as GatewayDataModel;

  constructor(
    private httpClient: HttpClient,
    private storeSettingService: StoreSettingService
  ) {
  }

  //functions

  get payData(): GatewayDataModel {
    return this._payData
  }

  set payData(payData: GatewayDataModel) {
    this._payData = payData
  }

  // https Services

  getOrderDetail(status: UserOrderStatus, orderId: number = 0) {
    return this.httpClient.get(`/api/order/new/${orderId}/${this.storeSettingService.store.id}/${status}`).pipe(
      map((response: OrderModel[] | OrderDetailModel[] ) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOrderComment(orderID: number) {
    return this.httpClient.get(`/api/features/getAllComment/${orderID}`).pipe(
      map((response: any[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getOrdersPayment(status: UserOrderStatus, orderId: number = 0) {
    return this.httpClient.get(`/api/payment/newPayment/${orderId}/${this.storeSettingService.store.id}/${status}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getNewOrderCounter() {
    return this.httpClient.get('/api/order/countcustomer').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getNewOrderDetails(orderId, storeId, status) {
    return this.httpClient.get('/api/order/new/' + orderId + '/' + storeId + '/' + status).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  deleteProductByProductStoreId(orderId, productId) {
    const _data = {
      PRODUCT_ID: productId
    }

    return this.httpClient.post(`/api/order/cartapp/${orderId}`, _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteSeveralProduct(data) {
    const _data = {
      DELETE: data.delete,
      ORDER_ID: data.orderID
    }

    return this.httpClient.put('/api/order/ProductReplacementCustomer', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  deleteOrderForCustomer(orderId) {
    return this.httpClient.delete(`/api/order/${orderId}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  payWithSabin(orderId, amount, PayType) {
    const _data = {
      ORDER_ID: orderId,
      Amount: amount,
      PayType: PayType,
      RedirectType: "payment",
    }

    return this.httpClient.post('/api/payment/merchantLogin', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  payWithZarinpal(orderId: number) {
    const _data = {
      ResNum: orderId,
      PayType: 'web'
    }

    return this.httpClient.post('/api/payment/zarinpalToken', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  payWithPayPal() {
    return this.httpClient.post('/api/payment/paypalToken', {}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  payWithIdPay(orderId, amount, PayType, name) {
    const _data = {
      ResNum: orderId,
      Amount: amount,
      Name: name,
      PayType: PayType,
      RedirectType: "payment",
    }

    return this.httpClient.post('/api/payment/idpay_token', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  payByWallet(orderId: number) {
    const _data = {
      payment_type: 3,
      payment_status: 1,
      ORDER_ID: orderId
    }

    return this.httpClient.post('/api/payment/cart', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  payInPlace(orderId: number) {
    const _data = {
      payment_type: 2,
      payment_status: 1,
      ORDER_ID: orderId
    }

    return this.httpClient.post('/api/payment/cart', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  pay(data: GatewayDataModel) {
    return this.httpClient.post('/api/payment/pay', {...data, TOTAL: data.amount}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  payWithCheque(data) {
    return this.httpClient.post('/api/payment/cheque', data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  payCardToCard(data) {
    return this.httpClient.post('/api/payment/card_to_card', data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getCardInfo() {
    return this.httpClient.get('/api/features/card_info').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getTax() {
    return this.httpClient.get('/api/admin/tax').pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  addOrderComment(USERS_ID: number, ORDER_ID: number, COMMENT: string, RATE: number) {
    const _data = {
      "COMMENT": COMMENT,
      "UR_ID": USERS_ID,
      "ORDER_ID": ORDER_ID,
      "RATE": RATE
    }
    return this.httpClient.post('/api/features/addComment/', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


}
