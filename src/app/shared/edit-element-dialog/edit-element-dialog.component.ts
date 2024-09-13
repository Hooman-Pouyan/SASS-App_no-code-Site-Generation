import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DragDropValueModel} from "@app/core/services/drag-drop.service";
import {ModulesService} from "@app/core/services/modules.service";

@Component({
  selector: 'mk-edit-element-dialog',
  templateUrl: './edit-element-dialog.component.html',
  styleUrls: ['./edit-element-dialog.component.scss']
})
export class EditElementDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<EditElementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DragDropValueModel & { hasLink: boolean },
    public modulesService: ModulesService
  ) {
  }

  ngOnInit(): void {
  }

  closeDialog(event?: DragDropValueModel): void {
    this.dialogRef.close(event)
  }

}
