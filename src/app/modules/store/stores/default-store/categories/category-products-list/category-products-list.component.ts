import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryModel} from '@app/core/models/category.model';
import {CategoryService} from '@app/core/services/category.service';
import {environment} from "@env/environment";
import {ProductsFilter} from "@app/core/models/product.model";
import {calculateDiscount, isInViewportFromBottom} from "@app/modules/global/functions";
import {PageEvent} from "@angular/material/paginator";
import {PaginationModel} from "@app/core/models/global.model";
import {_window} from "@app/modules/global/global-variable";
import {AppService} from "@app/core/services/app.service";
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'category-products-list',
  templateUrl: './category-products-list.component.html',
  styleUrls: ['./category-products-list.component.scss']
})
export class CategoryProductsListComponent implements OnInit {

  imageUrl: string = environment.ADMIN_API_URL
  category = {} as CategoryModel;
  calculateDiscount = (orgPrice: number, discPrice: number) => calculateDiscount(orgPrice, discPrice)
  @ViewChild("categoryProductList") categoryProductList: ElementRef;
  currentSort: ProductsFilter;
  currentBrandsFilter: number[] = [];
  currentColorsFilter: string[] = [];
  currentSizesFilter: string[] = [];
  minPriceFilter: number;
  maxPriceFilter: number;
  featureFilters: {
    key: string,
    values: string[]
  }[] = []
  sliceProducts: number = 5;

  paginatorConfig: PaginationModel = {
    PAGE_SIZE: this.moduleService.isKijaFood ? 50 : 15,
    PAGE_NUMBER: 0
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private moduleService: ModulesService,
    private categoryService: CategoryService,
    public appService: AppService,
    public modulesService  : ModulesService
  ) {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query: {
      [key: string]: string;
    }) => {
      if (query && query['category_pack']) {
        const _categories: number[] = query['category_pack'].split(',').map(Number).filter(f => f)
        _categories.forEach(categoryID => {
          this.categoryService.getCategoryDetail(categoryID).subscribe(category => {
            const sub: CategoryModel = {
              NAME: category.NAME,
              PRODUCT_CATEGORY: category.PRODUCT_CATEGORY,
              PRODUCT_ID: category.ID,
              ADDITIONAL_COST: 0,
              PRODUCT_NAME: category.IMAGE,
            }
            this.setSubCategoriesProducts(sub);
            if (!this.category.subCategories) {
              this.category.subCategories = []
            }
            this.category.subCategories.push(sub)
          })
        })
      } else {
        this.setCategory();
      }
    })
  }

  setProductsFilterByQuery(): void {

    let query = this.activatedRoute.snapshot.queryParams

    if (query) {
      let queryArray: [string, string][] = Object.entries(query);
      const queryObj: any = {}
      queryArray.forEach(each => {
        if (each[1]) {
          queryObj[each[0]] = each[1]
        } else {
          queryObj[each[0]] = null
        }
      })
      this.router.navigate(['.'], {
        relativeTo: this.activatedRoute,
        queryParams: queryObj,
        queryParamsHandling: 'merge'
      })
    }

    if (query && query['sort']) {
      this.currentSort = +query['sort'];
    }

    if (query && query['brands']) {
      this.currentBrandsFilter = query['brands'].split(',').map(Number);
    } else if (query['brands'] == '') {
      this.currentBrandsFilter = [];
    }

    if (query && query['sizes']) {
      this.currentSizesFilter = query['sizes'].split(',');
    } else if (query['sizes'] == '') {
      this.currentSizesFilter = [];
    }

    if (query && query['colors']) {
      this.currentColorsFilter = query['colors'].split(',');
    } else if (query['colors'] == '') {
      this.currentColorsFilter = [];
    }

    if (query && query['p_range']) {
      const _priceFilter: number[] = query['p_range'].split(',').map(Number)
      this.minPriceFilter = _priceFilter[0];
      this.maxPriceFilter = _priceFilter[1];
    }

    if (query) {
      this.featureFilters = []
      let queryArray: [string, string][] = Object.entries(query);
      queryArray = queryArray.filter(each => each[0] != 'sort' && each[0] != 'brands' && each[0] != 'sizes' && each[0] != 'colors' && each[0] != 'p_range')
      queryArray.forEach(each => {
        this.featureFilters.push({
          key: each[0],
          values: each[1].split(',')
        })
      })
    }

    this.setCategoryProducts()

    // this.activatedRoute.queryParams.subscribe(query => {
    //
    //
    //
    // });
  }

  setCategory(): void {
    this.activatedRoute.params.subscribe(params => {
      this.category.PRODUCT_ID = +params['id']
      this.category.subCategories = [];
      this.setProductsFilterByQuery();
      if (this.category.PRODUCT_ID != 1) {
        this.setSubCategories();
      }
    })
  }

  setCategoryProducts(): void {
    this.categoryService.getProductsByCategoryId(
      this.category.PRODUCT_ID,
      this.paginatorConfig.PAGE_SIZE,
      this.currentSort,
      this.currentBrandsFilter,
      [this.minPriceFilter, this.maxPriceFilter],
      this.currentSizesFilter,
      this.currentColorsFilter,
      this.featureFilters,
      this.paginatorConfig.PAGE_NUMBER + 1
    ).subscribe(products => {
      this.category.products = products?.DATA
      this.sliceProducts = 5
      this.paginatorConfig.TOTAL_COUNT = products?.PAGINATION?.TOTAL_COUNT
      // this.scrollTo();
    })
  }

  scrollTo() {
    // $('#categoryProductList').animate({
    //     scrollTop: 0
    //   },
    //   'slow');
    let test = $('#categoryProductList');
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#categoryProductList").offset().top
    }, 500);
  }

  setSubCategories(categoryID?: number): void {
    this.categoryService.getSubCategories(
      categoryID ? categoryID : this.category.PRODUCT_ID
    ).subscribe((subCategories: any[]) => {

      for (const subCategory of subCategories) {
        const sub: CategoryModel = {
          NAME: subCategory.product.NAME,
          PRODUCT_CATEGORY: subCategory.product.PRODUCT_CATEGORY,
          PRODUCT_ID: subCategory.product.ID,
          ADDITIONAL_COST: 0,
          PRODUCT_NAME: subCategory.product.IMAGE,
        }

        this.setSubCategoriesProducts(sub)
        if (!this.category.subCategories) {
          this.category.subCategories = []
        }
        this.category.subCategories.push(sub)
      }

    })
  }

  setSubCategoriesProducts(subCategory: CategoryModel): void {
    this.categoryService.getProductsByCategoryId(
      subCategory.PRODUCT_ID,
      10,
      this.currentSort,
      this.currentBrandsFilter,
      [this.minPriceFilter, this.maxPriceFilter],
      this.currentSizesFilter,
      this.currentColorsFilter,
      this.featureFilters,
      this.paginatorConfig.PAGE_NUMBER + 1
    ).subscribe(products => {
      subCategory.products = products?.DATA
    })
  }

  paginatorEvent(event: PageEvent): void {
    this.paginatorConfig.PAGE_SIZE = event.pageSize;
    this.paginatorConfig.PAGE_NUMBER = event.pageIndex;
    this.setCategoryProducts()
    this.appService.scrollToTop()
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const _productEl: Element = document.querySelector('.products');
    if (isInViewportFromBottom(_productEl)) {
      this.sliceProducts += 5
    }
  }

}
