import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralAttributeModel } from '@app/core/models/general-attribute.model';


@Component({
  selector: 'mk-feature-dialog',
  templateUrl: './feature-dialog.component.html',
  styleUrls: ['./feature-dialog.component.scss']
})
export class FeatureDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public feature: GeneralAttributeModel,
    private dialogRef: MatDialogRef<FeatureDialogComponent>,

  ) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
