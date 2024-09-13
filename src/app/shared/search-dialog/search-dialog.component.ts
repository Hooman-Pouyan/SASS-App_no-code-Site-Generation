import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ModulesService } from '@app/core/services/modules.service';
import { StoreService } from '@app/core/services/store.service';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinct, finalize, switchMap, tap } from 'rxjs/operators';
import { from } from 'rxjs';

@Component({
  selector: 'mk-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss']
})
export class SearchDialogComponent implements OnInit {
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
    private dialogRef: MatDialogRef<SearchDialogComponent>,
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
          for (let i of res.Product)
            if (i.LEAF == 1)
              this.allDataFiltered.Product.push(i);
            else
              subCategories.push(i);
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

  closeDialog() {
    this.dialogRef.close();
  }
}

