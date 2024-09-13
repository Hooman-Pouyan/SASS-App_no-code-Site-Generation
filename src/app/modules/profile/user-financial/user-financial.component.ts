import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModulesService } from 'src/app/core/services/modules.service';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {UserOrderStatus} from "@app/core/models/order.model";
import {OrderService} from "@app/core/services/order.service";

@Component({
  selector: 'mk-user-financial',
  templateUrl: './user-financial.component.html',
  styleUrls: ['./user-financial.component.scss'],
})
export class UserFinancialComponent implements OnInit {

  displayedColumns: string[] = ['COUNTER', 'factor_no', 'user', 'date', 'price', 'status', 'advance'];
  financialRecords: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public modulesService: ModulesService,
    private dialog: MatDialog,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.getFinancialRecords();
  }

  ngAfterViewInit() {
    this.financialRecords.paginator = this.paginator
  }

  getFinancialRecords(): void {
    this.orderService.getOrdersPayment(0, UserOrderStatus.active).subscribe(res => {
      this.financialRecords = new MatTableDataSource<any>(res)
    })
  }

}
