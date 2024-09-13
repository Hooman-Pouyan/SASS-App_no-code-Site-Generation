import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Renderer2
} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {
  CommentDialogComponent
} from "@app/modules/product/product-pages/component/comment-dialog/comment-dialog.component";
import {PaginationModel} from "@app/core/models/global.model";
import {ProductService} from "@app/core/services/product.service";
import {ModulesService} from "@app/core/services/modules.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductCommentModel} from "@app/core/models/product.model";
import {CredentialsService} from "@app/core/services/credentials.service";
import {Router} from "@angular/router";
import {NotificationService} from "@app/core/services/notification.service";
import {debounceTime, exhaustMap, switchMap, takeUntil, map, tap} from "rxjs/operators";
import {fromEvent} from "rxjs";
import {Renderer} from "html2canvas/dist/types/render/renderer";
export interface ProductCm {
  name: string
  store_id: number
}

@Component({
  selector: 'comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})

export class CommentListComponent implements OnInit{

  @Input() product: ProductCm;
  @Output() commentAverage: EventEmitter<number> = new EventEmitter<number>()

  @ViewChild('likeBtn', {static: true, read: ElementRef}) likeBtn: ElementRef;
  @ViewChild('DislikeBtn', {static: true, read: ElementRef}) DislikeBtn: ElementRef;

  kokhNariz2: number = 0;
  comments: ProductCommentModel = {
    CLASSIFY: [],
    COMMENTS: [],
  };
  paginatorConfig: PaginationModel = {
    PAGE_SIZE: 5,
    PAGE_NUMBER: 1,
    TOTAL_COUNT: 0
  };
  commentAvg: number = 0;

  constructor(
    private productService: ProductService,
    public modulesService: ModulesService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    public credentialService: CredentialsService,
    private renderer: Renderer2,
    private elementref: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.getComments();
  }

  addComments() {
    let COMMENTS = {
      Store_ID: this.product.store_id,
      product_name: this.product.name,
      CLASSIFY: this.comments.CLASSIFY
    }
    this.dialog.open(CommentDialogComponent, {
      width: '800px',
      height: '700px',
      maxWidth: '95%',
      maxHeight: '75%',
      data: COMMENTS
    })
  }

  getComments() {
    this.productService.getApprovedProductComments(this.product.store_id, this.paginatorConfig.PAGE_NUMBER, this.paginatorConfig.PAGE_SIZE).subscribe((res) => {
      if (res && res.COMMENTS.length) {
        this.comments = res
        this.comments.COMMENTS.map((el) => {
        })
        this.commentAvg = this.calculateAvgRate(this.comments)
      }
    });
  }

  calculateAvgRate(comments: ProductCommentModel): number {
    let sum = 0
    comments.COMMENTS.forEach(comment => sum += comment.RATE)
    return +(sum / comments.COMMENTS.length).toFixed(1);
  }

  paginatorEvent(event: PageEvent): void {
    this.paginatorConfig.PAGE_SIZE = event.pageSize;
    this.paginatorConfig.PAGE_NUMBER = event.pageIndex + 1;
    this.getComments()
  }

  goToAuth(): void {
    this.router.navigate(['/auth'])
  }

  setAction(comment, action: number) {
    // prevents frequent attempts
    if (this.kokhNariz2 < 10) {
      switch (comment.LIKED) {
        // either liked or disliked already
        case 1:
          // toggles like and turns off dislike
          if (action == 1) {
            comment.LIKES = comment.LIKES == 1 ? comment.LIKES = 0 : 1;
            comment.DISLIKE = comment.DISLIKE == 1 ? comment.DISLIKE = 0 : 0;
          } else {
            // toggles Dislike and turns off likes
            comment.LIKES = comment.LIKES == 1 ? comment.LIKES = 0 : 0;
            comment.DISLIKE = comment.DISLIKE == 1 ? comment.DISLIKE = 0 : 1;
          }
          break
        // Neither Liked nor Disliked yet
        default:
          if (action == 1) {
            comment.LIKES = 1;
            this.renderer.setStyle(this.likeBtn.nativeElement, color, green);
          }
          else comment.DISLIKE = 1
          comment.LIKED = 1;
      }

      this.kokhNariz2 += 1

    }else {
        // for frequent attempts
        this.notificationService.error("تعداد درخوسات های شما بیش از حد مجاز می باشد دوباره وارد شوید")
    }



    //  ***
    //  **
    //  *
    //  old strategy for like and dislike toggle ----------------
    // *****

    //   if (comment.LIKED != 0) {
    //     debugger
    //     this.productService.likeProductComment(comment.COMMENT_ID, 0, this.credentialService.credentials.USER_ROLE_ID).subscribe(() => {
    //       comment.LIKES = action == 1 ? comment.LIKES = 0 : 1;
    //       comment.DISLIKE = action == -1 ? comment.DISLIKE = 0 : 1;
    //       comment.LIKED = 0;
    //       console.log(comment.LIKES)
    //       console.log(comment.DISLIKE)
    //       console.log(comment.LIKED)
    //       debugger
    //     })
    //   } else {
    //     this.productService.likeProductComment(comment.COMMENT_ID, action, this.credentialService.credentials.USER_ROLE_ID).subscribe(() => {
    //       if(action == 1 ){
    //         // if (comment.DISLIKE == 1) comment.LIKED = 0
    //         // else comment.LIKED = 1
    //         comment.LIKES = 1
    //         comment.DISLIKE = 0;
    //         comment.LIKED = 1
    //         console.log(comment.LIKES)
    //         console.log(comment.DISLIKE)
    //         console.log(comment.LIKED)
    //         debugger
    //       }
    //       else if (action == -1){
    //         // if (comment.LIKES == 1) comment.LIKED = 0
    //         // else comment.LIKED = -1
    //         comment.LIKES = 0
    //         comment.DISLIKE = 1
    //         comment.LIKED = -1
    //         console.log(comment.LIKES)
    //         console.log(comment.LIKED)
    //         console.log(comment.DISLIKE)
    //         debugger
    //       }
    //
    //       // comment.LIKES = action == 1 ? 1 : comment.LIKES
    //       // comment.DISLIKE = action == -1 ? 1 : comment.DISLIKE
    //       // comment.LIKED = action
    //     })
    //   }
    //   this.kokhNariz += 1
    // } else {
    //   this.notificationService.error("تعداد درخوسات های شما بیش از حد مجاز می باشد دوباره وارد شوید")
    // }

  }

}
