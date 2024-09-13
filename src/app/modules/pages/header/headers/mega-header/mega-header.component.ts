import {Component, OnInit} from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {ModulesService} from "@app/core/services/modules.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {CartService} from "@app/core/services/cart.service";
import {AppService} from "@app/core/services/app.service";
import {CategoryService} from "@app/core/services/category.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {SidenavStatus} from "@app/core/models/cart.model";

@Component({
  selector: 'mega-header',
  templateUrl: './mega-header.component.html',
  styleUrls: ['./mega-header.component.scss']
})
export class MegaHeaderComponent implements OnInit {

  cartCount: number = 0;
  sidenavStatus = SidenavStatus;


  constructor(
    public storeSettingService: StoreSettingService,
    public modulesService: ModulesService,
    public credentialsService: CredentialsService,
    public cartService: CartService,
    public appService: AppService,
    private categoryService: CategoryService,
    public dragDropService: DragDropService
  ) {
  }

  ngOnInit(): void {
  }

}
