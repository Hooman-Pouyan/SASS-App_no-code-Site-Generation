import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CategoryService} from "@app/core/services/category.service";
import {PaginationModel} from "@app/core/models/global.model";
import {checkProductStatus, ProductSliderModel, ProductStatus, ProductStatusName} from "@app/core/models/product.model";
import {PageEvent} from "@angular/material/paginator";
import {AppService} from "@app/core/services/app.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {calculateDiscount} from "@app/modules/global/functions";
import {environment} from "@env/environment";

@Component({
  selector: 'compare-pick-product',
  templateUrl: './compare-pick-product.component.html',
  styleUrls: ['./compare-pick-product.component.scss']
})
export class ComparePickProductComponent implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;
  products: ProductSliderModel[] = []
  paginatorConfig: PaginationModel = {
    PAGE_SIZE: 10,
    PAGE_NUMBER: 0
  }
  sliceProducts: number = 5;
  calculateDiscount = (price: number, priceAfterOffer: number) => calculateDiscount(price, priceAfterOffer)
  productStatusName = (status: ProductStatus) => ProductStatusName(status)
  checkProductStatus = (status: ProductStatus) => checkProductStatus(status)

  constructor(
    public dialogRef: MatDialogRef<ComparePickProductComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: {
      categoryID: number,
      selectedProducts: number[]
    },
    private categoryService: CategoryService,
    private appService: AppService,
    public storeSettingService: StoreSettingService
  ) {}

  ngOnInit(): void {
    this.categoryService.getProductsByCategoryId(
      this.dialogData.categoryID,
      this.paginatorConfig.PAGE_SIZE,
      null,null,null,null,null, null,
      this.paginatorConfig.PAGE_NUMBER + 1
    ).subscribe(res => {
      this.products = res.DATA.filter(f => {
        if (!this.dialogData.selectedProducts.includes(f.PRODUCT_STORE_ID)) {
          return f
        }
      })
      this.sliceProducts = 5
      this.paginatorConfig.TOTAL_COUNT = res?.PAGINATION?.TOTAL_COUNT
    })
  }

  paginatorEvent(event: PageEvent): void {
    this.paginatorConfig.PAGE_SIZE = event.pageSize;
    this.paginatorConfig.PAGE_NUMBER = event.pageIndex;
    this.ngOnInit()
    this.appService.scrollToTop();
  }

}
