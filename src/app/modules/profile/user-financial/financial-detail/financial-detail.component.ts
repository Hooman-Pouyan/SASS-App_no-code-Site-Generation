import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {NgxCaptureService} from "ngx-capture";
import {OrderService} from "@app/core/services/order.service";
import {PaymentDetail} from "@app/core/models/order.model";

@Component({
  selector: 'mk-financial-detail',
  templateUrl: './financial-detail.component.html',
  styleUrls: ['./financial-detail.component.scss']
})
export class FinancialDetailComponent implements OnInit {

  financialRecord: PaymentDetail;
  @ViewChild('financialRecordEl', {static: true}) financialRecordEl: ElementRef;
  disableExportBtn: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrderService,
    private captureService: NgxCaptureService,
  ) { }

  ngOnInit(): void {
    this.getFinancialDetail();
  }

  getFinancialDetail(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.getFinancialRecords(+params.id)
      }
    })
  }

  getFinancialRecords(financialID: number): void {
    this.orderService.getOrdersPayment(financialID, 2).subscribe(record => {
      this.financialRecord = record[0]
    })
  }

  exportPDF(): void {
    this.disableExportBtn = true;
    let DATA: any = document.getElementById('financialRecordEl');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const fileURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(fileURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(`factor_${this.financialRecord.ORDER_ID}.pdf`);
      this.disableExportBtn = false;
    });
  }

  exportPicture(): void {
    this.disableExportBtn = true;
    this.captureService.getImage(this.financialRecordEl.nativeElement, true).subscribe(img => {
      const link = document.createElement("a");
      link.href = img;
      link.download = `factor_${this.financialRecord.ORDER_ID}.png`
      link.click();
      this.disableExportBtn = false;
    });
  }

}
