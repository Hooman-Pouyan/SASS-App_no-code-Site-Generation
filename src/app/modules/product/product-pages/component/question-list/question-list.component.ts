import {Component, Input, OnInit} from '@angular/core';
import {ProductQ_A} from "@app/core/models/product.model";
import {QADialogComponent} from "@app/modules/product/product-pages/component/qa-dialog/qa-dialog.component";
import {ProductService} from "@app/core/services/product.service";
import {MatDialog} from "@angular/material/dialog";
import {PaginationModel} from "@app/core/models/global.model";
import {PageEvent} from "@angular/material/paginator";
import {NotificationService} from "@app/core/services/notification.service";
import {CredentialsService} from "@app/core/services/credentials.service";

@Component({
  selector: 'question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {

  @Input() product_id: number;

  Q_A: ProductQ_A;
  Question: string
  AnswerSlice: number = 2;

  like: boolean = false
  kokh_nariz: number = 0
  QuestionMaxChar: number = 150;

  paginatorConfig: PaginationModel = {
    PAGE_SIZE: 2,
    PAGE_NUMBER: 1,
    TOTAL_COUNT: 0,
    TOTAL_PAGES: 1
  }


  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    public credentialService: CredentialsService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    this.getProductQuestions()
  }

  QA_dialog(type, ID, question?) {
    if(type == 'login' ){
      this.notificationService.error("ایتدا وارد حساب کارری شوید")
    }
    else{
      let Data = {
        type: type,
        Store_ID: this.product_id,
        PARENT_ID: ID,
        QUESTION: question,
      }
      this.dialog.open(QADialogComponent, {
        width: '600px',
        height: '400px',
        maxWidth: '95%',
        data: Data
      })
    }

  }

  getProductQuestions() {
    this.productService.getProductQuestion(this.product_id, this.paginatorConfig.PAGE_NUMBER, this.paginatorConfig.PAGE_SIZE).subscribe((res) => {
      if (res.DATA?.length) {
        this.paginatorConfig.TOTAL_COUNT = res?.PAGINATION?.TOTAL_COUNT
        this.Q_A = {DATA: res.DATA.filter(f => f.PARENT_QUESTION_ID == 1)}
        res.DATA.map(el => {
          el.ANSWER = {DATA: res.DATA.filter(f => f.PARENT_QUESTION_ID != 1 && f.PARENT_QUESTION_ID == el.QUESTION_ID)}
        })
      }
      //**
    })
  }

  paginatorEvent(event: PageEvent): void {
    this.paginatorConfig.PAGE_SIZE = event.pageSize;
    this.paginatorConfig.PAGE_NUMBER = event.pageIndex + 1;
    this.getProductQuestions()
  }

  setAction(ans, action: number) {
    if(this.kokh_nariz < 10 ){
      if (ans.LIKED != 0) {
        this.productService.LikeProductAnswer(ans.ID, 0, this.product_id).subscribe(() => {
          ans.LIKES = action == 1 ? ans.LIKES -= 1 : ans.LIKES
          ans.DISLIKE = action == -1 ? ans.DISLIKE -= 1 : ans.DISLIKE
          ans.LIKED = 0
        })
      }
      else {
        this.productService.LikeProductAnswer(ans.ID, action, this.product_id).subscribe(() => {
          ans.LIKES = action == 1 ? ans.LIKES += 1 : ans.LIKES
          ans.DISLIKE = action == -1 ? ans.DISLIKE += 1 : ans.DISLIKE
          ans.LIKED = action
        })
      }
      this.kokh_nariz +=1
    }
    else{
      this.notificationService.error("تعداد درخوسات های شما بیش از حد مجاز می باشد دوباره وارد شوید")
    }

  }

}
