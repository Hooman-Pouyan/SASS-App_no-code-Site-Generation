import {AfterViewInit, Component, OnInit} from '@angular/core';
import {LandingService} from "@app/core/services/landing.service";
import {environment} from "@env/environment";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";
import {DragDropService} from "@app/core/services/drag-drop.service";
import {DynamicMediaService} from "@app/core/services/dynamic-media.service";
import {jarallax} from "jarallax";
import * as $ from "jquery";

@Component({
  selector: 'mk-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit, AfterViewInit {

  blogs: GeneralAttributeModel[] = [];
  defaultImage: string = '../../../../assets/img/help/attribute.png';
  search: string
  selectedCategory: string
  blogCategories

  constructor(
    private landingService: LandingService,
    public dragDropService: DragDropService,
    public dynamicMediaService: DynamicMediaService
  ) {
  }

  ngOnInit(): void {
    this.getBlogs()
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


  searchProducts(searchWord: string): void {
    this.search = searchWord
      setTimeout(() => {
        this.getBlogs()
      }, 500)
  }


  getBlogs(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.blog, this.selectedCategory, this.search).subscribe(res => {
      this.blogs = res.map(m => {
        m.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + m.FILES
        return m
      })
    })
  }

  getCategory() {
    this.landingService.getCategoryBlog(GeneralAttributeType.blog).subscribe(res => {
      this.blogCategories = res
      this.blogCategories.push({'CATEGORY_NAME': "همه دسته بندی ها"})
    })
  }

  updateListCategory(event) {
    if(event == "همه دسته بندی ها"){
      this.selectedCategory = ""
    }
    this.getBlogs()
  }


}
