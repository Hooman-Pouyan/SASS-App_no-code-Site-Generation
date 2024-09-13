import { Component, OnInit } from '@angular/core';
import { OrderService } from '@app/core/services/order.service';
import { CreditDialogComponent } from './credit-dialog/credit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '@app/core/services/user.service';
import { CredentialsService } from "@app/core/services/credentials.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";

@Component({
  selector: 'mk-user-wallet',
  templateUrl: './user-wallet.component.html',
  styleUrls: ['./user-wallet.component.scss']
})
export class UserWalletComponent implements OnInit {

  wallet: number = 0;

  constructor(
    public dialog: MatDialog,
    private OrderService: OrderService,
    private userService: UserService,
    private credentialService: CredentialsService,
    public storeSettingService: StoreSettingService
  ) {
  }

  ngOnInit() {
    this.getWalletCount();
  }


  getWalletCount() {
    this.userService.getWallet(this.credentialService.credentials.ID).subscribe(
      (res: any) => {
        if (res) {
          this.wallet = res.FINANCIAL_BALANCE_AFTER;
        }
      });
  }


  openAddCredit() {
    this.dialog.open(CreditDialogComponent, {
      width: '30%',
      autoFocus: false,
      panelClass: 'custom-panel-dialog',
    }).afterClosed().subscribe(
      () => {
        this.getWalletCount();
      }
    );
  }

}
