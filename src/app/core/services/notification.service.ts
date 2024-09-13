import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar,
    private translateService: TranslateService,
  ) {
  }

  valid(message: string, action?: string, duration?: number) {
    this.snackBar.open(
      this.translateService.instant(message),
      action || null,
      {
        duration: duration || 2000,
        direction: 'rtl',
        horizontalPosition: 'right',
        panelClass: 'validSnackBar'
      }
    );
  }

  error(message: string, action?: string, duration?: number) {
    this.snackBar.open(
      this.translateService.instant(message),
      action || null,
      {
        duration: duration || 2500,
        direction: 'rtl',
        horizontalPosition: 'right',
        panelClass: 'errorSnackBar'
      }
    );
  }

  warning(message: string, action?: string, duration?: number) {
    this.snackBar.open(
      this.translateService.instant(message),
      action || null,
      {
        duration: action ? undefined : (duration || 2500),
        direction: 'rtl',
        horizontalPosition: 'right',
        panelClass: 'warningSnackBar'
      }
    );
  }


}
