import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SidenavStatus } from '@app/core/models/cart.model';
import { AppService } from '@app/core/services/app.service';
import { CartService } from '@app/core/services/cart.service';
import { CredentialsService } from '@app/core/services/credentials.service';
import { ModulesService } from '@app/core/services/modules.service';
import { StoreSettingService } from '@app/core/services/store-setting.service';
import { SearchDialogComponent } from '@app/shared/search-dialog/search-dialog.component';
import { environment } from '@env/environment';

@Component({
  selector: 'dark-header',
  templateUrl: './dark-header.component.html',
  styleUrls: ['./dark-header.component.scss']
})
export class DarkHeaderComponent implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;

  sidenavStatus = SidenavStatus;
  cartCount: number = 0;

  constructor(
    private dialog: MatDialog,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public modulesService: ModulesService,
    public cartService: CartService,
    public appService: AppService

  ) {
  }

  ngOnInit() {
    this.onCallCartNotebook();
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

  logOut() {
    this.credentialsService.logout();
  }

  openSearchDg() {
    this.dialog.open(SearchDialogComponent, {
      maxWidth: '100%',
      width: '400px',
      height: "100%",
      autoFocus: false,
    });
  }

}
