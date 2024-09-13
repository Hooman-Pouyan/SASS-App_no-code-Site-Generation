import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'edit-media-element-dialog',
  templateUrl: './edit-media-element-dialog.component.html',
  styleUrls: ['./edit-media-element-dialog.component.scss']
})
export class EditMediaElementDialogComponent implements OnInit {

  mediaToUpload: File;
  isDeleted: boolean = false

  constructor(
    private dialogRef: MatDialogRef<EditMediaElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      media: File | string,
      link: string,
      bestWidth: string,
      bestHeight: string
    }) {
  }

  ngOnInit(): void {

  }

  closeDialog(event?: any): void {
    this.dialogRef.close(event)
  }

  submit(): void {
    const _data: {
      media: File,
      deleted: boolean,
      link: string
    } = {
      media: this.mediaToUpload,
      link: this.data.link,
      deleted: this.isDeleted
    }
    this.closeDialog(_data)
  }


}
