import {Component, OnInit} from '@angular/core';
import {ModulesService} from "@app/core/services/modules.service";
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CategoryService} from "@app/core/services/category.service";
import {CategoryModel} from "@app/core/models/category.model";
import {environment} from "@env/environment";
import {LandingService} from "@app/core/services/landing.service";

@Component({
  selector: 'mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss']
})
export class MegaMenuComponent implements OnInit {

  Detail: boolean = false
  groupBySubCat: any[] = [];
  groupByCat: any[] = [];
  categories: any[] = []
  subCategories: any[] = []
  currentCat:any = []
  imageUrl: string = environment.ADMIN_API_URL;


  constructor(
    public modulesService: ModulesService,
    public storeSettingService: StoreSettingService,
    private categoryService: CategoryService,
    private landingService: LandingService
  ) {
  }

  ngOnInit(): void {
    this.getMenuDetail();
  }

  getMenuDetail() {
    this.landingService.getMenuDetail().subscribe(res => {
      if (res) {
        this.groupByCat = this.groupByCategory(res.data)
        for (let category in this.groupByCat) {
          this.categories.push(category)
        }
      }
    });
  }

  groupByCategory(array) {
    return array.reduce((r, a) => {
      r[a.CATEGORY] = r[a.CATEGORY] || [];
      r[a.CATEGORY].push(a);
      return r;
    }, Object.create(null));
  }

  groupBySubCategory(array) {
    return array.reduce((r, a) => {
      r[a.SUB_CATEGORY] = r[a.SUB_CATEGORY] || [];
      r[a.SUB_CATEGORY].push(a);
      return r;
    }, Object.create(null));
  }

  addCat(category) {
    this.currentCat=this.groupByCat[category][0]
    this.subCategories = []
    this.groupBySubCat = this.groupBySubCategory(this.groupByCat[category])
    for (let sub in this.groupBySubCat) {
      this.subCategories.push(sub)
    }
  }

}
