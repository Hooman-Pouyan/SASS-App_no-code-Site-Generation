import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LandingService} from "@app/core/services/landing.service";
import {environment} from "@env/environment";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";

@Component({
  selector: 'mk-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent implements OnInit {

  blog = {} as GeneralAttributeModel;
  blogs: GeneralAttributeModel[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private landingService: LandingService,
  ) { }

  ngOnInit(): void {
    this.getBlogs();
    this.activatedRoute.params.subscribe(params => {
      if (params?.id) {
        this.getBlog(params.id)
      }
    })
  }

  getBlogs(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.blog).subscribe(res => {
      this.blogs = res.map(m => {
        m.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + m.FILES
        return m
      })
    })
  }

  getBlog(blogID: number): void {
    this.landingService.getOneGeneralAttribute(GeneralAttributeType.blog, blogID).subscribe(res => {
      this.blog = res[0];
      this.blog.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + this.blog.FILES
    })
  }

}
