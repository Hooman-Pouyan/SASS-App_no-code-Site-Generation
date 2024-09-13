import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryModel} from '@app/core/models/category.model';
import {CategoryService} from "@app/core/services/category.service";
import {ProductsFilter} from "@app/core/models/product.model";
import {StoreService} from "@app/core/services/store.service";
import {StoreBrandsModel} from "@app/core/models/store.model";
import {NotificationService} from "@app/core/services/notification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {removeDuplicateFromArray} from "@app/modules/global/functions";

interface featureFilterModel {
  VALUE: string,
  NAME: string
}

@Component({
  selector: 'products-filter',
  templateUrl: './products-filter.component.html',
  styleUrls: ['./products-filter.component.scss']
})
export class ProductsFilterComponent implements OnInit {

  @Output() closeSideNav: EventEmitter<boolean> = new EventEmitter<boolean>();

  categories: CategoryModel[] = [];
  brands: StoreBrandsModel[] = [];
  searchedBrands: StoreBrandsModel[] = [];
  colors: featureFilterModel[] = [];
  searchedColors: featureFilterModel[] = [];
  sizes: featureFilterModel[] = [];
  searchedSizes: featureFilterModel[] = [];
  featureFilters: {
    filterName: string,
    defaultValues?: featureFilterModel[],
    searchedValues?: featureFilterModel[],
    selectedValues?: string[]
  }[] = [];

  sortBy: ProductsFilter;
  sortTypes: {
    name: string,
    value: number
  }[] = [
    {
      name: 'ارزان‌ترین',
      value: ProductsFilter.cheapest
    },
    {
      name: 'گران‌ترین',
      value: ProductsFilter.mostExpensive
    },
    {
      name: 'بیشترین تخفیف',
      value: ProductsFilter.mostDiscount
    },
    {
      name: 'پرفروش‌ترین',
      value: ProductsFilter.mostSell
    },
    {
      name: 'پربازدیدترین',
      value: ProductsFilter.mostViewed
    },
  ];
  selectedBrands: number[] = [];
  selectedSizes: string[] = [];
  selectedColors: string[] = [];
  minimumFilterPrice: number = 0;
  maximumFilterPrice: number = 15000000;

  constructor(
    private categoryService: CategoryService,
    private storeService: StoreService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.setValuesByQuery();
    this.getCategories();
    this.getColorSizeFeature();
    this.getBrands();
    this.getFeatureForFilter()
  }

  setValuesByQuery(): void {
    this.activatedRoute.queryParams.subscribe((query: {
      [key: string]: string;
    }) => {
      if (query && query['sort']) {
        this.sortBy = +query['sort'];
      }
      if (query && query['brands']) {
        this.selectedBrands = query['brands'].split(',').map(Number)
      }
      if (query && query['sizes']) {
        this.selectedSizes = query['sizes'].split(',')
      }
      if (query && query['colors']) {
        this.selectedColors = query['colors'].split(',')
      }
      if (query && query['p_range']) {
        const _priceFilter: number[] = query['p_range'].split(',').map(Number)
        this.minimumFilterPrice = _priceFilter[0]
        this.maximumFilterPrice = _priceFilter[1]
      }
    })
  }

  setDynamicFilterByQuery(): void {
    this.activatedRoute.queryParams.subscribe((query: {
      [key: string]: string;
    }) => {
      if (query) {
        this.featureFilters.forEach(each => {
          each.selectedValues = query[each.filterName]?.split(',')
        })
      }
    })
  }

  getCategories() {
    this.categoryService.getParentCategories().subscribe(categories => {
      if (categories) {
        this.categories = categories;
        this.categories?.forEach(category => {
          category.subCategories = []
        })
      }
    });
  }

  getSubCategories(category: CategoryModel) {
    this.categoryService.getSubCategories(category.PRODUCT_ID).subscribe((subCategories: any[]) => {
      subCategories?.forEach(subCategory => {
        category.subCategories.push({
          NAME: subCategory.product.NAME,
          PRODUCT_CATEGORY: subCategory.product.PRODUCT_CATEGORY,
          PRODUCT_ID: subCategory.product.ID,
          ADDITIONAL_COST: 0,
          PRODUCT_NAME: subCategory.product.IMAGE,
        })
      })
    })
  }

  getBrands() {
    this.storeService.getProductBrands().subscribe(res => {
      this.searchedBrands = this.brands = res;
    })
  }

  getColorSizeFeature(): void {
    this.storeService.getFeaturesForFilter(
      +this.activatedRoute.snapshot.params.id,
      ["size", "color", "رنگ", "سایز"]
    ).subscribe((res: featureFilterModel[]) => {
      res.forEach(feature => {
        if (feature.NAME.toLowerCase() == 'size' || feature.NAME.toLowerCase() == 'سایز') {
          // feature.VALUE = p2e(feature.VALUE)
          this.sizes.push(feature)
        } else if (feature.NAME.toLowerCase() == 'color' || feature.NAME.toLowerCase() == 'رنگ') {
          // feature.VALUE = p2e(feature.VALUE)
          this.colors.push(feature)
        }
      })
      this.searchedSizes = this.sizes = removeDuplicateFromArray(this.sizes, 'VALUE')
      this.searchedColors = this.colors = removeDuplicateFromArray(this.colors, 'VALUE')
    })
  }

  getFeatureForFilter(): void {
    this.categoryService.getCategorySpecifications(+this.activatedRoute.snapshot.params.id, 1).subscribe(res => {

      this.featureFilters = []
      res.forEach(each => {
        if (each.PARENT_ID != null) {
          this.featureFilters.push({
            filterName: each.NAME
          })
        }
      })

      this.storeService.getFeaturesForFilter(
        +this.activatedRoute.snapshot.params.id,
        this.featureFilters.map(m => m.filterName)
      ).subscribe((res: featureFilterModel[]) => {
        this.featureFilters.forEach(featureFilter => {
          featureFilter.defaultValues = featureFilter.searchedValues = res.filter(f => f.NAME == featureFilter.filterName)
        })
        this.featureFilters = this.featureFilters.filter(f => f.defaultValues.length)
      })
      this.setDynamicFilterByQuery();
    })
  }

  filterByPrice(): void {
    if (this.maximumFilterPrice >= this.minimumFilterPrice) {
      this.router.navigate(['.'], {
        relativeTo: this.activatedRoute,
        queryParams: {'p_range': `${this.minimumFilterPrice},${this.maximumFilterPrice}`},
        queryParamsHandling: 'merge',
      }).then(() => {
      });
    } else {
      this.notificationService.error('حداکثر قیمت باید بزرگتر از حداقل قیمت باشد')
    }
  }

  filterByBrands(): void {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {'brands': this.selectedBrands.join(',')},
      queryParamsHandling: 'merge',
    }).then(() => {
    });
  }

  filterByColor(): void {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {'colors': this.selectedColors.join(',')},
      queryParamsHandling: 'merge',
    }).then(() => {
    });
  }

  filterBySize(): void {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {'sizes': this.selectedSizes.join(',')},
      queryParamsHandling: 'merge',
    }).then(() => {
    });
  }

  sortProducts(): void {
    this.router.navigate(['.'], {
      relativeTo: this.activatedRoute,
      queryParams: {'sort': this.sortBy},
      queryParamsHandling: 'merge',
    }).then(() => {
    });
  }

  filterByFeature(filterName: string): void {
    const filter = this.featureFilters.find(f => f.filterName == filterName)
    if (filter) {
      this.router.navigate(['.'], {
        relativeTo: this.activatedRoute,
        queryParams: {
          [filterName]: filter?.selectedValues?.join(','),
        },
        queryParamsHandling: 'merge',
      }).then(() => {
      });
    }
  }

  search(value: string, type: 'brand' | 'size' | 'color' | string) {
    switch (type) {
      case "brand":
        this.searchedBrands = this.brands.filter(option => option.NAME.toLowerCase().includes(value.toLowerCase()));
        return
      case "color":
        this.searchedColors = this.colors.filter(option => option.VALUE.toLowerCase().includes(value.toLowerCase()));
        return
      case "size":
        this.searchedSizes = this.sizes.filter(option => option.VALUE.toLowerCase().includes(value.toLowerCase()));
        return
      default:
        const filter = this.featureFilters.find(f => f.filterName == type)
        filter.searchedValues = filter.defaultValues.filter(option => option.VALUE.toLowerCase().includes(value.toLowerCase()));
        return;
    }
  }

}
