import {Component, OnInit} from '@angular/core';
import {SearchDialogComponent} from "@app/shared/search-dialog/search-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {SidenavStatus} from "@app/core/models/cart.model";
import {CartService} from "@app/core/services/cart.service";
import {ModulesService} from "@app/core/services/modules.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {AppService} from "@app/core/services/app.service";
import {CategoryService} from "@app/core/services/category.service";
import {NestedMenuModel} from "@app/shared/dynamic-nested-menu/dynamic-nested-menu.component";

@Component({
  selector: 'motolead-header',
  templateUrl: './motolead-header.component.html',
  styleUrls: ['./motolead-header.component.scss']
})
export class MotoleadHeaderComponent implements OnInit {

  sidenavStatus = SidenavStatus;
  cartCount: number = 0;
  categoryMenu: NestedMenuModel = {
    displayName: '',
  }

  constructor(
    private dialog: MatDialog,
    private categoryService: CategoryService,
    public cartService: CartService,
    public modulesService: ModulesService,
    public dragDropService: DragDropService,
    public storeSettingService: StoreSettingService,
    public credentialsService: CredentialsService,
    public appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.onCallCartNotebook();
    this.setCategoriesForMenu();
  }

  onCallCartNotebook(): void {
    // this.cartService.updateLocalCart();
    // this.cartService.updateLocalNotebook();
    this.cartService.cartCount.subscribe(count => {
      this.cartCount = count
    })
  }

  openSearchDg() {
    this.dialog.open(SearchDialogComponent, {
      maxWidth: '100%',
      width: '100%',
      height: "100%",
      autoFocus: false,
    });
  }

  setCategoriesForMenu(): void {
    this.categoryService.getParentCategories().subscribe(parentCategories => {
      parentCategories.forEach(pCategory => {
        this.categoryService.getSubCategories(pCategory.PRODUCT_ID).subscribe((subCategories: any[]) => {
          const categoryItem: NestedMenuModel = {
            displayName: pCategory.NAME,
            route: `/store/category/${pCategory.PRODUCT_ID}/${pCategory.NAME.replace('/', '').split(' ').join('-')}/`,
            children: subCategories.map(subC => {
              return {
                displayName: subC.product.NAME,
                route: `/store/category/${subC.product.ID}/${subC.product.NAME.replace('/', '').split(' ').join('-')}/`,
              }
            })
          }
          if (this.categoryMenu?.children?.length) {
            this.categoryMenu.children.push(categoryItem)
          } else {
            this.categoryMenu.children = [categoryItem]
          }
        })
      })
    })
  }

}
