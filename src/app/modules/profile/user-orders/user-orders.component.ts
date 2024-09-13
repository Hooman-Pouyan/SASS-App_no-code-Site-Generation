import { Component, OnInit } from "@angular/core";

@Component({
  selector: "mk-user-orders",
  templateUrl: "./user-orders.component.html",
  styleUrls: ["./user-orders.component.scss"],
})

export class UserOrdersComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {
  }

  // openSurveyDialog() {
  //   this.dialog.open(UserOrderSurveyDgComponent, {
  //     maxWidth: '95%',
  //     width: "40rem",
  //     autoFocus: true,
  //   }).afterClosed().subscribe(() => {})
  // }
  //
  // deleteOrderCart(item) {
  //   const dialogRef = this.dialog.open(ConfirmComponent, {
  //     width: "20rem",
  //   });
  //   dialogRef.afterClosed().subscribe(res => {
  //     if (res) {
  //       this.orderService.deleteOrderForCustomer(item.ORDER_ID).subscribe(() => {});
  //     }
  //   });
  // }
}
