import {Injectable} from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {Observable} from 'rxjs';
import {ProductService} from "@app/core/services/product.service";


@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<any> {

  constructor(
    private productService: ProductService,
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let is_search: boolean;
    if (route.queryParams['search']) {
      is_search = true;
    }
    return this.productService.getProductDetail(route.params.id, is_search);
  }
}
