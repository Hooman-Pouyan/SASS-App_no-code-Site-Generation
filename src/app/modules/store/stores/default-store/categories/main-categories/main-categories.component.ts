import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '@app/core/models/category.model';
import { CategoryService } from '@app/core/services/category.service';
import { environment } from '@env/environment';

@Component({
  selector: 'mk-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.scss']
})
export class MainCategoriesComponent implements OnInit {
  categories: CategoryModel[] = [];
  imageUrl: string = environment.ADMIN_API_URL

  constructor(
    private categoryService: CategoryService
  ) {
  }

  ngOnInit(): void {
    this.getCategories();
  }


  getCategories() {
    this.categoryService.getParentCategories().subscribe(categories => {
      if (categories) {
        this.categories = categories;
        this.categories.forEach(category => {
          category.subCategories = []
          this.getSubCategories(category)
        })
      }
    });
  }

  getSubCategories(category: CategoryModel) {
    this.categoryService.getSubCategories(category.PRODUCT_ID).subscribe((subCategories: any[]) => {
      subCategories.forEach(subCategory => {
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

}
