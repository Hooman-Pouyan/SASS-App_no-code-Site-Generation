import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "@app/core/services/product.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {LandingService} from "@app/core/services/landing.service";
import {MatChipInputEvent} from '@angular/material/chips'
import {NotificationService} from "@app/core/services/notification.service";

@Component({
  selector: 'comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  newComment: string = "";
  newCommentRate: number = 1;
  commentMaxChar: number = 255;
  suggestion: boolean = false;

  goodAdvise: string[] = [];
  badAdvise: string[] = [];

  Quality: any[] = []
  selectQuality: number = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    public credentialService: CredentialsService,
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    private landingService: LandingService,
    private notificationService: NotificationService,
  ) {
  }

  ngOnInit(): void {
    debugger
    this.Quality = this.data.CLASSIFY
  }

  addOnGood(event: MatChipInputEvent): void {
    this.goodAdvise.push(event.value)
    event.value = null

  }

  addOnBad(event: MatChipInputEvent): void {
    this.badAdvise.push(event.value)
    event.value = null
  }


  removeOnGood(value): void {
    const index = this.goodAdvise.indexOf(value);
    if (index >= 0) {
      this.goodAdvise.splice(index, 1);
    }
  }

  removeOnBad(value): void {
    const index = this.badAdvise.indexOf(value);
    if (index >= 0) {
      this.badAdvise.splice(index, 1);
    }
  }


  submit() {
    let STRENGTHS = this.goodAdvise
    let WEAK_POINTS = this.badAdvise

    this.productService.addProductComments(
      this.credentialService.credentials.USER_ROLE_ID,
      this.data.Store_ID,
      this.newComment,
      this.newCommentRate,
      STRENGTHS,
      WEAK_POINTS,
      this.suggestion,
      this.selectQuality
    ).subscribe(() => {
      this.notificationService.valid('باتشکر، نظر شما ثبت گردید و پس از تایید، نمایش داده خواهد شد', '', 3000)
    });
  }

}
