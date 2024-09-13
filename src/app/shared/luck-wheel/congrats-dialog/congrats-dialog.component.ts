import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-congrats-dialog',
  templateUrl: './congrats-dialog.component.html',
  styleUrls: ['./congrats-dialog.component.scss']
})
export class CongratsDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CongratsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public prize: string
  ) { }

  ngOnInit(): void {
  }

  close(event?: boolean){
    this.dialogRef.close(event)
  }

}
