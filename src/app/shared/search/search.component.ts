import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { from } from 'rxjs';
import { debounceTime, distinct, finalize, switchMap, tap } from 'rxjs/operators';
import { ModulesService } from 'src/app/core/services/modules.service';
import { StoreService } from 'src/app/core/services/store.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() searchColor: string;
  @Input() border: string = "outline";
  @Input() useButton: boolean;
  @Input() circleShape: boolean;


  imageUrlDevelop: string = environment.ADMIN_API_URL;

  SearchCtrl: FormControl = new FormControl();
  SearchCtrlLoading: boolean = false;
  LoadingAutoCompelate: boolean = false;
  allDataFiltered: any = {
    Product: [],
    Store: [],
    StoreCategory: []
  };

  constructor(
    public translate: TranslateService,
    private storeService: StoreService,
    public modulesService: ModulesService
  ) {
  }

  ngOnInit() {
    this.search();
  }

  search() {
    this.allDataFiltered = {
      Product: [],
      Store: [],
      StoreCategory: [],
      subCategory: []
    };
    this.SearchCtrl.valueChanges.pipe(
      tap(() => this.SearchCtrlLoading = true),
      debounceTime(500),
      tap(() => this.LoadingAutoCompelate = true),
      switchMap(
        (value: string) => {
          return this.storeService.search(value)
            .pipe(
              finalize(() => this.LoadingAutoCompelate = false),
            )
        }
      )
    ).subscribe(
      (res: any) => {
        this.SearchCtrlLoading = false;
        if (res != null) {
          this.allDataFiltered.subCategory = [];
          this.allDataFiltered.Product = [];
          this.allDataFiltered.StoreCategory = [];
          let subCategories: any[] = [];
          for (let i of res.Product) {
            if (i.LEAF == 1)
              this.allDataFiltered.Product.push(i);
            else if (i.PRODUCT_PARENT_ID != 1)
              subCategories.push(i);
          }
          this.allDataFiltered.StoreCategory = res.StoreCategory;
          from<any>(subCategories).pipe(distinct((p: any) => p['PRODUCT_ID'])).subscribe(x => this.allDataFiltered.subCategory.push(x));
        } else {
          this.allDataFiltered.Product = [];
          this.allDataFiltered.subCategory = [];
          this.allDataFiltered.StoreCategory = [];
        }
      }
    );
  }

}

