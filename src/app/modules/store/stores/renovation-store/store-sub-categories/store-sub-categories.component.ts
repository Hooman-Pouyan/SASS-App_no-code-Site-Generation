import {Component, HostListener, OnInit} from '@angular/core';
import { environment } from '@env/environment';
import {ActivatedRoute} from "@angular/router";
import { StoreService } from '@app/core/services/store.service';
import {calculateDiscount} from "../../../../global/functions";
import {Location} from '@angular/common';
import { CategoryService } from "@app/core/services/category.service"
import {_window} from "@app/modules/global/global-variable";
import {AppService} from "@app/core/services/app.service";
declare var $: any;

@Component({
  selector: 'mk-store-sub-categories',
  templateUrl: './store-sub-categories.component.html',
  styleUrls: ['./store-sub-categories.component.scss']
})
export class StoreSubCategoriesComponent implements OnInit {

  siteLogo: string = localStorage.getItem('siteLogo');
  adminImageUrlDevelop: string = environment.ADMIN_API_URL;
  is_guest: boolean = localStorage.getItem('is_guest') == '1';
  storeId = localStorage.getItem("storeId");

  categoryId: number;
  categoryName: string;
  isCategory: boolean = false;
  isSubCategory: boolean = false;
  cartToggle: boolean = false;
  prevCategoryName: string = ''
  subCategories: any[] = [];

  headerPosition: 'relative' | 'fixed'

  calculateDiscount = (num1, num2) => calculateDiscount(num1, num2)

  constructor(
    private activatedRoute: ActivatedRoute,
    private storeService: StoreService,
    private _location: Location,
    private categoryService : CategoryService,
    private appService: AppService
  ) {
  }

  ngOnInit(): void {
    this.setTypeOfCategory();
  }

  @HostListener('window:scroll')
  onScroll() {
    if (this.appService.muchScrolled > 1) {
      this.headerPosition = "fixed"
    } else {
      this.headerPosition = "relative"
    }
  }

  scrollToCategory(category_name: string) {
    $('.category-list').animate({
        scrollTop: $(`#${category_name}`).offset().top - 150
      },
      'slow');
  }

  extractGenealogy(genealogy_name: string, pos: number) {
    return genealogy_name.split(',').slice(pos).shift()
  }

  setTypeOfCategory(): void {
    this.categoryId = this.activatedRoute.snapshot.params.id
    this.categoryService.getSubCategories(this.categoryId).subscribe(res => {
      if (res && res.length) {
        this.categoryName = this.extractGenealogy(res[0].product.GENEALOGY_NAME, -3)
        this.setCategory(res)
      } else if (res && res.length < 1) {
        this.setSubCategory();
      }
    })
  }

  setCategory(categories: any[]) {
    this.isCategory = true;
    this.activatedRoute.queryParams.subscribe(query => {
      if (query?.subs) {
        let subCategories: any[] = query.subs.split(',')
        categories.forEach(each => {
          if (subCategories.find(f => f == each.PRODUCT_ID)) {
            this.subCategories.push({
              ID: each.PRODUCT_ID,
              NAME: each.product?.NAME
            })
            this.storeService.getProductOfCategoryId(each.PRODUCT_ID).subscribe(res => {
              this.subCategories.find(f => f.ID == each.PRODUCT_ID).products = res
            })
          }
        })
      } else {
        categories.forEach(each => {
          this.subCategories.push({
            ID: each.PRODUCT_ID,
            NAME: each.product?.NAME
          })
          this.storeService.getProductOfCategoryId(each.PRODUCT_ID).subscribe(res => {
            this.subCategories.find(f => f.ID == each.PRODUCT_ID).products = res
          })
        })
      }
    })
  }

  setSubCategory() {
    this.isSubCategory = true
    this.storeService.getProducts(this.categoryId).subscribe(res => {
      this.prevCategoryName = this.extractGenealogy(res[0].GENEALOGY_NAME, -4)
      this.subCategories.push({
        ID: this.categoryId,
        NAME: this.categoryName = this.extractGenealogy(res[0].GENEALOGY_NAME, -3),
        products: res
      })
    })
  }

  routeBack() {
    this._location.back();
  }

}
