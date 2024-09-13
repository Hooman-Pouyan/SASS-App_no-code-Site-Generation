import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {LandingService} from "@app/core/services/landing.service";
import {environment} from "@env/environment";
import {GeneralAttributeModel, GeneralAttributeType} from "@app/core/models/general-attribute.model";

@Component({
  selector: 'mk-news-view',
  templateUrl: './news-view.component.html',
  styleUrls: ['./news-view.component.scss']
})
export class NewsViewComponent implements OnInit {

  oneNew = {} as GeneralAttributeModel;
  news: GeneralAttributeModel[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private landingService: LandingService,
  ) { }

  ngOnInit(): void {
    this.getNews();
    this.activatedRoute.params.subscribe(params => {
      if (params?.id) {
        this.getOneNew(params.id)
      }
    })
  }

  getNews(): void {
    this.landingService.getGeneralAttributes(GeneralAttributeType.news).subscribe(res => {
      this.news = res.map(m => {
        m.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + m.FILES
        return m
      })
    })
  }

  getOneNew(newsID: number): void {
    this.landingService.getOneGeneralAttribute(GeneralAttributeType.news, newsID).subscribe(res => {
      this.oneNew = res[0];
      this.oneNew.FILES = environment.ADMIN_API_URL + '/assets/img/content/' + this.oneNew.FILES
    })
  }

}
