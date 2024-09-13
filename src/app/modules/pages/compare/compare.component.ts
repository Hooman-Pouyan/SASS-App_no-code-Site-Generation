import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "@app/core/services/product.service";
import {ProductModel} from "@app/core/models/product.model";
import {environment} from "@env/environment";
import {Observable} from "rxjs/internal/Observable";
import {forkJoin} from "rxjs";
import {DefaultProductComponent} from "@app/modules/product/product-pages/default-product/default-product.component";
import {Location} from "@angular/common";
import {AppService} from "@app/core/services/app.service";
import {MatDialog} from "@angular/material/dialog";
import {ComparePickProductComponent} from "@app/modules/pages/compare/compare-pick-product/compare-pick-product.component";

@Component({
  selector: 'compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss'],
  providers: [DefaultProductComponent]
})
export class CompareComponent implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL;
  products: ProductModel[] = [];
  rowFlex: '200px' | '30%' = this.appService.windowWidth < 959 ? '30%' : '200px';
  productFields: {
    type: string,
    faName: string
  }[] = [
    {
      type: 'productAdditional.VIEWS',
      faName: 'تعداد بازدید'
    },
    {
      type: 'LINK',
      faName: 'تعداد بازدید'
    },
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private productComponent: DefaultProductComponent,
    private location: Location,
    public appService: AppService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.setCompareProductPerSlug();
  }

  setCompareProductPerSlug(): void {
    this.activatedRoute.params.subscribe(res => {
      const productAPI: Observable<any>[] = [];
      Object.values(res).forEach(id => {
        productAPI.push(this.productService.getProductDetail(id, false))
      })
      this.appService.manualLoading = true
      forkJoin(productAPI).subscribe(
        (products: any[]) => {
          products.forEach(product => {
            this.products.push(this.productComponent.setProductData({product: product}, true));
          })
          this.appService.manualLoading = false
          this.checkTableRows();
        },
        () => {
          this.appService.manualLoading = false
        }
      )
    })
  }

  checkTableRows(): void {
    let table: HTMLTableElement = document.querySelector(".compare-table");
    let rows: HTMLTableRowElement[] = table.rows as unknown as HTMLTableRowElement[]

    for (let row of rows) {
      if (!row.className.includes('images-row')) {
        if (this.canAddCompareProduct() && !row.getElementsByClassName('blankTableData').length) {
          let newEl = document.createElement('td');
          newEl.style.flex = `1 1 ${this.rowFlex}`;
          newEl.style.boxSizing = 'border-box';
          newEl.style.maxWidth = `${this.rowFlex}`;
          newEl.style.minWidth = `${this.rowFlex}`;
          newEl.style.marginLeft = 'auto';
          newEl.className = 'blankTableData';
          row.appendChild(newEl);
        } else if (this.canAddCompareProduct() && row.getElementsByClassName('blankTableData').length > 1) {
          const elements = row.getElementsByClassName('blankTableData');
          while (elements.length > 1) {
            elements[0].parentNode.removeChild(elements[0]);
          }
        } else if (!this.canAddCompareProduct() && row.getElementsByClassName('blankTableData').length)  {
          const elements = row.getElementsByClassName('blankTableData');
          while (elements.length > 0) {
            elements[0].parentNode.removeChild(elements[0]);
          }
        }
      }
    }

  }

  removeProduct(productID: number): void {
    this.products = this.products.filter(f => f.PRODUCT_STORE_ID != productID);
    this.location.go(`/compare/${this.products.map(e => e.PRODUCT_STORE_ID).join('/')}`)
    this.checkTableRows();
  }

  canAddCompareProduct(): boolean {
    if (this.appService.windowWidth < 959) {
      return this.products.length < 2;
    } else {
      return this.products.length < 4;
    }
  }

  addProductToCompare(): void {
    const productGen: string[] = this.products[0].GENEALOGY.split(',');
    productGen.shift();
    productGen.pop();
    this.dialog.open(ComparePickProductComponent, {
      width: '600px',
      maxWidth: '100%',
      maxHeight: '80%',
      data: {
        categoryID: +productGen[1],
        selectedProducts: this.products.map(el => el.PRODUCT_STORE_ID)
      }
    }).afterClosed().subscribe((productID: string) => {
      if (productID) {
        this.productService.getProductDetail(productID, false).subscribe(product => {
          this.products.push(this.productComponent.setProductData({product: product}, true));
          this.location.go(`/compare/${this.products.map(e => e.PRODUCT_STORE_ID).join('/')}`)
          this.checkTableRows();
        })
      }
    })
  }

}
