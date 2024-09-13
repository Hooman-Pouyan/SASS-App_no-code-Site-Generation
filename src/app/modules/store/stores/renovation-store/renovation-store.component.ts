import { Component, OnInit } from '@angular/core';
import {AppService} from "@app/core/services/app.service";
import {environment} from "@env/environment";
import { CategoryService } from "@app/core/services/category.service";
@Component({
  selector: 'mk-renovation-store',
  templateUrl: './renovation-store.component.html',
  styleUrls: ['./renovation-store.component.scss']
})
export class RenovationStoreComponent implements OnInit {

  adminImageUrlDevelop: string = environment.ADMIN_API_URL;

  categories: any[] = []

  constructor(
    private mainService: AppService,
    private categoryService:CategoryService,

  ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  getCategories() {
    this.categoryService.getParentCategories().subscribe(res => {
      if (res) {
        this.categories = res;
      }
    });
  }

}
