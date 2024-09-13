import { Component, OnInit } from '@angular/core';
import {StoreSettingService} from "@app/core/services/store-setting.service";
import {CategoryModel} from "@app/core/models/category.model";
import {environment} from "@env/environment";
import {CategoryService} from "@app/core/services/category.service";
import { adjustColor } from '@app/modules/global/functions';
import {ModulesService} from "@app/core/services/modules.service";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";

@Component({
  selector: 'mobile-section',
  templateUrl: './mobile-section.component.html',
  styleUrls: ['./mobile-section.component.scss']
})
export class MobileSectionComponent implements OnInit {
  categories: CategoryModel[] = [];
  imageUrl: string = environment.ADMIN_API_URL;
  adjustColor = (amount: number, color: string = this.modulesService.primaryColor) => adjustColor(color, amount);

  constructor(
    public storeSettingService: StoreSettingService,
    private categoryService: CategoryService,
    public modulesService: ModulesService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService,
  ) { }

  ngOnInit(): void {
    this.getMainCategories();
  }



  getMainCategories(): void {
    this.categoryService.getParentCategories().subscribe(categories => {
      if (categories) {
        this.categories = categories;
      }
    });
  }

}
