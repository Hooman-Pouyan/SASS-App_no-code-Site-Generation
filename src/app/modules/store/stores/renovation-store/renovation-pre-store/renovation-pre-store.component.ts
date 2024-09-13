import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ModulesService } from 'src/app/core/services/modules.service';
import { UserService } from '@app/core/services/user.service';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from "@angular/router";
import { StoreService } from '@app/core/services/store.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { CategoryService } from '@app/core/services/category.service';

interface categoryInfo {
  KEY: string,
  VALUE: string,
  STORE_CATEGORY_ID: string,
  UR_ID: string
}

@Component({
  selector: 'mk-renovation-pre-store',
  templateUrl: './renovation-pre-store.component.html',
  styleUrls: ['./renovation-pre-store.component.scss']
})
export class RenovationPreStoreComponent implements OnInit, AfterViewInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  storeId: string = localStorage.getItem("storeId");

  categories: any[] = []
  subCategories: any[] = []
  selectedSubCategories: any[] = []
  selectedCategory: any = {}

  guest = JSON.parse(localStorage.getItem("guest"))
  userId: string = localStorage.getItem("USER_ROLE_ID") || this.guest.guestURI
  useDefault

  widthVal: string = "width"
  lengthVal: string = "length"
  heightVal: string = "height"

  width: string = ""
  length: string = ""
  height: string = ""

  addWallVal: string = "addWall"
  removeWallVal: string = "removeWall"
  wiresVal: string = "wires"
  outletsVal: string = "outlets"

  addWall: string
  removeWall: string
  wires: string
  outlets: string

  adminImageUrlDevelop: string = environment.ADMIN_API_URL;

  temp1Category: categoryInfo;
  temp2Category: categoryInfo;
  temp3Category: categoryInfo;
  temp4Category: categoryInfo;
  temp5Category: categoryInfo;
  temp6Category: categoryInfo;
  temp7Category: categoryInfo;


  listCategoryInfo: categoryInfo[] = []

  constructor(
    public modulesService: ModulesService,
    private storeService: StoreService,
    private usersService: UserService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private CategoryService:CategoryService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.activateRoute.queryParams.subscribe(query => {
      this.getCategories();
      if (query?.category) {
        this.selectedCategory.PRODUCT_ID = +query.category;
        this.getSubCategories();
        this.myStepper.selectedIndex = 1
      }
    })
  }

  getCategories() {
    this.CategoryService.getParentCategories().subscribe(res => {
      if (res) {
        this.categories = res;
      }
    });
  }

  getSubCategories() {
    this.CategoryService.getSubCategories(this.selectedCategory.PRODUCT_ID).subscribe(res => {
      if (res) {
        this.subCategories = res;
        this.subCategories.forEach(each => {
          each.checked = false
        })
      }
    });
  }

  checkStep2ButtonDisable(): boolean {
    return !this.subCategories.filter(f => f.checked).length;
  }

  setCategory(category) {
    this.myStepper.next();
    this.selectedCategory = category
    this.getSubCategories();
  }

  goToStep3() {
    this.selectedCategory = this.categories.find(f => f.PRODUCT_ID == this.selectedCategory.PRODUCT_ID)
    this.selectedSubCategories = this.subCategories.filter(f => f.checked)

    this.usersService.setUserCategoryInfo(this.listCategoryInfo).subscribe(() => {
      const selectedSubCategoriesId: number[] = this.selectedSubCategories.map(sub => sub.product.ID)
      this.router.navigate(['/store/renovation/', this.selectedCategory.PRODUCT_ID], {
        queryParams: {
          subs: selectedSubCategoriesId.join(',')
        }
      })
    });
  }

  setData() {
    this.temp1Category = {
      KEY: this.widthVal,
      VALUE: this.width,
      STORE_CATEGORY_ID: this.selectedCategory.PRODUCT_CATEGORY,
      UR_ID: this.userId
    }

    this.temp2Category = {
      KEY: this.lengthVal,
      VALUE: this.length,
      STORE_CATEGORY_ID: this.selectedCategory.PRODUCT_CATEGORY,
      UR_ID: this.userId
    }

    this.temp3Category = {
      KEY: this.heightVal,
      VALUE: this.height,
      STORE_CATEGORY_ID: this.selectedCategory.PRODUCT_CATEGORY,
      UR_ID: this.userId
    }

    this.listCategoryInfo.push(this.temp1Category)
    this.listCategoryInfo.push(this.temp2Category)
    this.listCategoryInfo.push(this.temp3Category)

    this.myStepper.next()
  }


  setMoreData() {
    this.temp4Category = {
      KEY: this.addWallVal,
      VALUE: this.addWall,
      STORE_CATEGORY_ID: this.selectedCategory.PRODUCT_CATEGORY,
      UR_ID: this.userId
    }

    this.temp5Category = {
      KEY: this.removeWallVal,
      VALUE: this.removeWall,
      STORE_CATEGORY_ID: this.selectedCategory.PRODUCT_CATEGORY,
      UR_ID: this.userId
    }

    this.temp6Category = {
      KEY: this.wiresVal,
      VALUE: this.wires,
      STORE_CATEGORY_ID: this.selectedCategory.PRODUCT_CATEGORY,
      UR_ID: this.userId
    }

    this.temp7Category = {
      KEY: this.outletsVal,
      VALUE: this.outlets,
      STORE_CATEGORY_ID: this.selectedCategory.PRODUCT_CATEGORY,
      UR_ID: this.userId
    }

    this.listCategoryInfo.push(this.temp4Category)
    this.listCategoryInfo.push(this.temp5Category)
    this.listCategoryInfo.push(this.temp6Category)
    this.listCategoryInfo.push(this.temp7Category)

    this.myStepper.next()
  }

  toggle(event: MatSlideToggleChange) {
  }
}
