import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LandingService} from "@app/core/services/landing.service";
import {environment} from "@env/environment";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {jarallax} from "jarallax";
import * as $ from "jquery";

@Component({
  selector: 'mk-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, AfterViewInit {

  news: GeneralAttributeModel[] = [];
  defaultImage: string = '../../../../assets/img/help/attribute.png';
  search: string = ""
  selectedCatrgory
  newCategories

  constructor(
    private landingService: LandingService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService
  ) { }

  ngOnInit(): void {
    this.getNews()
    this.getCategory()
  }

  ngAfterViewInit() {
    this.jarallaxInit();
  }

  jarallaxInit(): void {
    //@ts-ignore
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.2
    });
    // return $.fn.jarallax to previously assigned value & give $().newJarallax the Jarallax functionality
    // @ts-ignore
    $?.fn?.newJarallax = $?.fn?.jarallax?.noConflict()
  }

  getNews(category?, search?): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.news).subscribe(res => {
      this.news = res.map(m => {
        m.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + m.FILES
        return m
      })
    })
  }

  getCategory() {
    this.landingService.getCategoryBlog(GeneralAttributeType.news).subscribe(res => {
      this.newCategories = res
    })
  }

  updateListCategory(event) {
    this.selectedCatrgory = event
    this.getNews(this.selectedCatrgory.CATEGORY_NAME, this.search)
  }

  updateSearch() {
    this.getNews(this.selectedCatrgory.CATEGORY_NAME, this.search)
  }

}
