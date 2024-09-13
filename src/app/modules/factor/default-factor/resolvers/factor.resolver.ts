import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import {CartService} from "@app/core/services/cart.service";

@Injectable({
  providedIn: 'root'
})
export class FactorResolver implements Resolve<any[]> {

  constructor(
    private cartService: CartService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
    return this.cartService.getCart()
  }
}
