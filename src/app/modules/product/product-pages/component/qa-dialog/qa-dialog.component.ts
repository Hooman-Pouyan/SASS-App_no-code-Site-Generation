import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GeneralAttributeModel} from "@app/core/models/general-attribute.model";
import {LandingService} from "@app/core/services/landing.service";
import {ProductService} from "@app/core/services/product.service";
import {NotificationService} from "@app/core/services/notification.service";

@Component({
  selector: 'qa-dialog',
  templateUrl: './qa-dialog.component.html',
  styleUrls: ['./qa-dialog.component.scss']
})
export class QADialogComponent implements OnInit {

  Question: string = ''
  QuestionMaxChar = 200

  constructor(
    public dialogRef: MatDialogRef<QADialogComponent>,
    private productService: ProductService,
    private notificationService: NotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.close();
  }

  addProductQuestions() {
    this.productService.AddProductQuestion(this.data.Store_ID, this.Question, this.data.PARENT_ID).subscribe(() => {
      this.notificationService.valid("با موفقیت ثبت شد")
      this.closeDialog()
    })
  }


}
