import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'mk-renovation-factor-expert-dg',
  templateUrl: './renovation-factor-expert-dg.component.html',
  styleUrls: ['./renovation-factor-expert-dg.component.scss']
})

export class RenovationFactorExpertDgComponent implements OnInit {
  constructor(
    private dialogRef: MatDialogRef<RenovationFactorExpertDgComponent>,
  ) {

  }

  ngOnInit(): void {
  }

  close(event?) {
    this.dialogRef.close(event)
  }


}
