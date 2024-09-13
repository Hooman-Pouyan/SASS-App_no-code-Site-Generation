import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-phone-support-dialog',
  templateUrl: './phone-support-dialog.component.html',
  styleUrls: ['./phone-support-dialog.component.scss'],
})

export class PhoneSupportDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit() {

    if (this.data && this.data.phoneSupport && this.data.phoneSupport.length > 0) {
      for (const item of this.data.phoneSupport) {
        item.VALUE = item.VALUE.replace("tel:", "");
      }
    }
  }
}
