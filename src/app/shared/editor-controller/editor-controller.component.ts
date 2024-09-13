import { Component, OnInit } from '@angular/core';
import {DragDropService} from "@app/core/services/drag-drop.service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmComponent} from "@app/shared/confirm/confirm.component";

@Component({
  selector: 'admin-editor-controller',
  templateUrl: './editor-controller.component.html',
  styleUrls: ['./editor-controller.component.scss']
})
export class EditorControllerComponent implements OnInit {


  constructor(
    public dragDropService: DragDropService,
    private matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  saveDragDropChanges(): void {
    this.matDialog.open(ConfirmComponent, {
      width: '250px'
    }).afterClosed().subscribe(confirm => {
      if (confirm == true) {
        this.dragDropService.setDragDrop()
      }
    })
  }

}
