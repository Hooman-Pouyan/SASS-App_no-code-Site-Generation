import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map} from "rxjs/operators";
import {LandingModel} from "@app/core/models/landing.model";
import {throwError} from "rxjs";
import {environment} from "@env/environment";
import {CredentialsService} from "@app/core/services/credentials.service";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class DynamicMediaService {

  private _medias: LandingModel[] = [];

  constructor(
    private httpClient: HttpClient,
    private credentialService: CredentialsService,
    private sanitizer: DomSanitizer
  ) {
  }

  initMedias(): void {
    this.getDynamicMedia().subscribe(res => this._medias = res)
  }

  getMedia(type: string): string {
    const _media: LandingModel = this._medias.find(f => f?.VALUE_TYPE == type)
    if (_media && _media?.VALUE != 'undefined' && _media?.VALUE?.includes('asset')) {
      return environment.ADMIN_API_URL + _media.VALUE
    } else if (_media && _media.VALUE != 'undefined') {
      return _media.VALUE
    } else if (this.credentialService.isAdmin) {
      return '/assets/img/default/default.png'
    } else {
      return null
    }
  }

  getMediaLink(type: string): string {
    const _media: LandingModel = this._medias.find(f => f.VALUE_TYPE == (type + 'Link'))
    if (_media && _media.VALUE != 'undefined') {
      return _media?.VALUE
    }
    if (this.credentialService.isAdmin) {
      // return 'javascript:void(0)'
      return <string>this.sanitizer.bypassSecurityTrustResourceUrl('javascript:void(0)')
    }
    return null
  }

  get mediaSliderLoop(): number[] {
    if (this.credentialService.isAdmin) {
      return Array.from({length: 6}, (_, i) => i + 1)
    }
    const length = this._medias?.filter(
      f => f?.VALUE_TYPE?.includes('slider') &&
        !f?.VALUE_TYPE?.includes('sliderLink') &&
        f?.VALUE != 'undefined'
    )?.length
    return Array.from({length: length}, (_, i) => i + 1)
  }

  get mediaBrandsLoop(): number[] {
    if (this.credentialService.isAdmin) {
      return Array.from({length: 8}, (_, i) => i + 1)
    }
    const length = this._medias?.filter(
      f => f?.VALUE_TYPE?.includes('brand') &&
        f.VALUE != 'undefined'
    )?.length
    return Array.from({length: length}, (_, i) => i + 1)
  }

  private getDynamicMedia() {
    return this.httpClient.get('/api/landing/getlandingvalue').pipe(
      map((response: LandingModel[]) => response),
      catchError((error: HttpErrorResponse) => throwError(error))
    );
  }
}
