import {Injectable, Injector} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {throwError} from "rxjs";
import {SidenavStatus} from "@app/core/models/cart.model";
import {_window} from "@app/modules/global/global-variable";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  private _loading: Subject<boolean> = new Subject<boolean>();
  private _manualLoading: Subject<boolean> = new Subject<boolean>();
  private _serverFailed: Subject<boolean> = new Subject<boolean>();
  private _headerSidenavStatus: Subject<SidenavStatus> = new Subject<SidenavStatus>();
  private _fromFactor: boolean;

  constructor() {}

  // services

  set loading(loading: boolean | any) {
    this._loading.next(loading)
  }

  get loading(): Subject<boolean> | any {
    return this._loading
  }

  set manualLoading(loading: boolean | any) {
    this._manualLoading.next(loading)
  }

  get manualLoading(): Subject<boolean> | any {
    return this._manualLoading
  }

  set serverFailed(loading: boolean | any) {
    this._serverFailed.next(loading)
  }

  get serverFailed(): Subject<boolean> | any {
    return this._serverFailed
  }

  set headerSidenav(status: SidenavStatus | any) {
    this._headerSidenavStatus.next(status)
  }

  get headerSidenav(): Subject<SidenavStatus> | any {
    return this._headerSidenavStatus
  }

  set fromFactor(status: boolean) {
    this._fromFactor = status
  }

  get fromFactor(): boolean {
    return this._fromFactor
  }

  get windowWidth(): number {
    return _window.innerWidth
  }

  get muchScrolled(): number {
    return _window.pageYOffset || document.documentElement.scrollTop
  }

  refresh = () => _window.location.reload()

  scrollToTop = () => {
    _window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  goBack = () => {
    if (document.referrer == "") {
      _window.close()
    } else {
      history.back()
    }
  }

  // http services


}
