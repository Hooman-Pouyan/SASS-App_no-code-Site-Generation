import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {ProductCommentModel, ProductQ_A, ProductSliderModel, ProductSliderType} from "@app/core/models/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  constructor(
    private httpClient: HttpClient
  ) {
  }


  getProductsWithProduct(productID) {
    return this.httpClient.get('/api/products/order/' + productID).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getSimilarProducts(productID) {
    return this.httpClient.get('/api/products/similar/' + productID).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  getProductDetail(productID, is_search?: boolean) {
    let params = new HttpParams()
    if (is_search) {
      params = params.set('SEARCH', '1')
    }

    return this.httpClient.get('/api/products/pstore/' + productID, {params: params}).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  getProductLimitedSummary(type: ProductSliderType, limit: number, user_role_id?: number) {
    let params = new HttpParams()

    if (user_role_id) {
      params = params.set('USER_ROLE_ID', user_role_id.toString())
    }

    const body = {
      "TYPE": type,
      "LIMIT": limit
    }
    return this.httpClient.post('/api/features/limitedSummary/', body, {params: params}).pipe(
      map((response: ProductSliderModel[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  getApprovedProductComments(PRODUCT_STORE_ID , page , limit) {
    let params = new HttpParams()
    params = params.set('page', page.toString())
    params = params.set('limit', limit.toString())

    return this.httpClient.get('/api/products/comments/' + PRODUCT_STORE_ID , {params:params}).pipe(
      map((response: ProductCommentModel) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  addProductComments(USERS_ID, PRODUCT_STORE_ID, COMMENT, RATE, STRENGTHS,WEAK_POINTS , SUGGEST, QUALITY_CLASSIFY_ID) {
    const _data = {
      "COMMENTS": COMMENT,
      "UR_ID": USERS_ID,
      "PRODUCT_STORE_ID": PRODUCT_STORE_ID,
      "RATE": RATE,
      "STRENGTHS": STRENGTHS.toString(),
      "WEAK_POINTS": WEAK_POINTS.toString(),
      "SUGGESTION": SUGGEST,
      "QUALITY_CLASSIFY_ID": QUALITY_CLASSIFY_ID
    }
    return this.httpClient.post('/api/products/comments/', _data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


  getProductQuestion(PRODUCT_ID, page, limit) {
    let params = new HttpParams()
    params = params.set('page', page.toString())
    params = params.set('limit', limit.toString())

    return this.httpClient.get(`/api/products/questions/${PRODUCT_ID}`, {params: params}).pipe(
      map((response: ProductQ_A) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  AddProductQuestion(PRODUCT_STORE_ID, QUESTION, PARENT_ID?) {
    let Data = {}
    if (PARENT_ID == 1) {
      Data = {
        PRODUCT_STORE_ID: PRODUCT_STORE_ID,
        QUESTION: QUESTION,
      }
    } else {
      Data = {
        PRODUCT_STORE_ID: PRODUCT_STORE_ID,
        QUESTION: QUESTION,
        PARENT_ID: PARENT_ID
      }
    }

    return this.httpClient.post('/api/products/questions', Data).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  LikeProductAnswer(QuestionID, typeNo, PRODUCT_STORE_ID) {
    let type = typeNo == 1 ? 'LIKE' : 'DISLIKE'
    if (typeNo == 0) {
      type = "NO_ACTION"
    }
    const body = {
      "TYPE": type,
      "PRODUCT_STORE_ID": PRODUCT_STORE_ID
    }
    return this.httpClient.post(`/api/products/questions/like/${QuestionID}`, body).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }

  likeProductComment(CommentID, typeNo , userID) {
    let type = typeNo == 1 ? 'LIKE' : 'DISLIKE'
    if (typeNo == 0) {
      type = "NO_ACTION"
    }
    const body = {
      "TYPE": type,
      "UR_ID": userID
    }
    return this.httpClient.post(`/api/products/comments/like/${CommentID}`, body).pipe(
      map((response: any) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }


}
