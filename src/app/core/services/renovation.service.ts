import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RenovationService {

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getOrderCustomerImage(categoryId) {
    return this.httpClient.get(`/api/order/getCustomerImage/${categoryId}`).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  renovationCustomerAccept(order: any[]) {
    let time = new Date();
    time.setMonth(time.getMonth() + 1);

    order.forEach(each => {
      each.COMMENT = ''
      each.ORDER_DELIVERY_DATE = time
      each.ORDER_DELIVERY_TYPE_ID = 1
    })

    const _data = {
      ORDERS: order,
      OFFER_CODE: ''
    };

    return this.httpClient.put("/api/order/customerAccept", _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  orderImageUpload(beforeFile, data) {
    const formData: FormData = new FormData();
    formData.append("BEFOR_IMAGE", beforeFile, beforeFile?.name);
    formData.append("ORDER_ID", data?.orderId);
    formData.append("DELETED", '0');
    formData.append("UR_ID", data?.userRoleId);
    formData.append("CATEGORY_ID", data?.product?.PRODUCT_CATEGORY);
    formData.append("AFTER_IMAGE", '');

    return this.httpClient.post("/api/order/uploadImage", formData).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

}
