import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {OrderService} from "@app/core/services/order.service";
import {CredentialsService} from "@app/core/services/credentials.service";
import {NotificationService} from "@app/core/services/notification.service";

@Component({
  selector: 'mk-order-comment',
  templateUrl: './order-comment.component.html',
  styleUrls: ['./order-comment.component.scss']
})
export class OrderCommentComponent implements OnInit {

  commentMaxChar: number = 250;
  comment: string = '';
  rate: number = 1;
  readOnly: boolean = false

  constructor(
    private dialogRef: MatDialogRef<OrderCommentComponent>,
    @Inject(MAT_DIALOG_DATA) private orderID: number,
    private orderService: OrderService,
    private credentialsService: CredentialsService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.getOrderComment()
  }

  getOrderComment(): void {
    this.orderService.getOrderComment(this.orderID).subscribe(res => {
      if (res?.length) {
        this.readOnly = true;
        this.comment = res[0].COMMENTS
        this.rate = res[0].RATE
      }
    })
  }

  submit(): void {
    this.orderService.addOrderComment(
      this.credentialsService.credentials.USER_ROLE_ID,
      this.orderID,
      this.comment,
      this.rate
    ).subscribe(() => {
      this.notificationService.valid('باتشکر، نظر شما ثبت گردید', '', 3000)
      this.closeDialog(true)
    })
  }

  closeDialog(event?: boolean) {
    this.dialogRef.close(event)
  }

}
